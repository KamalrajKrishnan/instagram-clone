import { useState, useEffect  } from "react";
import toast, { Toaster} from "react-hot-toast";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [textValue, setTextValue] = useState("");

  // Loading states
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();
  const handleOnChange = (event) => {
    setTextValue(event.target.value);
  };  

  // Fetch Todo list
  const getTodoList = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:5000/api/todoList"
      );

      setTodoList(response.data?.data || []);
    } catch (e) {
      toast.error(
        e.response?.data?.message || "Failed to fetch todo"
      );
    } finally {
      setLoading(false);
    }
  };

  // Create Todo
  const handleCreateTodo = async () => {
    if (!textValue.trim()) {
      toast.error("Please enter todo title");
      return;
    }

    setCreating(true);

    try {
      await axios.post(
        "http://localhost:5000/api/createTodo",
        {
          title: textValue.trim(),
        }
      );

      toast.success(`${textValue} Todo created successfully!`);

      setTextValue("");

      // Refresh list
      await getTodoList();

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create todo"
      );
    } finally {
      setCreating(false);
    }
  };

  // Delete Todo
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this todo?"
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      await axios.delete(
        `http://localhost:5000/api/deleteTodo/${id}`
      );

      toast.success("Todo deleted successfully!");

      // Refresh list
      await getTodoList();

    } catch (e) {
      toast.error(
        e.response?.data?.message || "Failed to delete todo"
      );
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{ duration: 2500 }}
      />

      <div className="mx-auto w-full max-w-xl bg-white p-6 shadow-xl">

        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Todo List
        </h1>

        {/* Create Todo */}
        <div className="flex gap-3">

          <input
            value={textValue}
            className="flex-1 border border-gray-300 px-4 py-2
                       outline-none transition
                       focus:border-green-500 focus:ring-2
                       focus:ring-green-200"
            type="text"
            name="title"
            id="title"
            placeholder="Enter todo..."
            onChange={handleOnChange}
            disabled={creating}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateTodo();
              }
            }}
          />

          <button
            className="flex min-w-[100px] items-center justify-center
                       bg-green-500 px-5 py-2 font-medium text-white
                       transition hover:bg-green-600
                       active:scale-95 cursor-pointer
                       disabled:cursor-not-allowed
                       disabled:opacity-60"
            onClick={handleCreateTodo}
            disabled={creating}
          >
            {creating ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Creating...
              </>
            ) : (
              "Create"
            )}
          </button>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-green-500"></div>

            <span className="ml-3 text-sm text-gray-500">
              Loading todos...
            </span>
          </div>
        ) : todoList.length > 0 ? (

          <ul className="space-y-3">

            {todoList.map((todo) => (
              <li
                key={todo._id}
                className="flex items-center justify-between
                           border border-gray-50
                           bg-gray-50 px-4 py-3
                           shadow-sm transition
                           hover:bg-gray-100"
              >

                <span
                  className="text-gray-700"
                  id={todo._id} onClick={()=>{navigate(`/todoDetails/${todo._id}`)}}
                >
                  {todo.title}
                </span>

                <button
                  type="button"
                  title="Delete todo"
                  aria-label={`Delete ${todo.title}`}
                  disabled={deletingId === todo._id}
                  className="flex h-8 w-8 items-center justify-center
                             rounded-full text-red-500
                             transition hover:bg-red-100
                             hover:text-red-700
                             cursor-pointer
                             disabled:cursor-not-allowed
                             disabled:opacity-50"
                  onClick={() => handleDelete(todo._id)}
                >

                  {deletingId === todo._id ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-400 border-t-transparent"></span>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-7 0v12a1 1 0 001 1h6a1 1 0 001-1V7M10 11v5M14 11v5"
                      />
                    </svg>
                  )}

                </button>

              </li>
            ))}

          </ul>

        ) : (

          <p className="bg-gray-50 px-4 py-6 text-center text-sm text-red-400">
            No records found.
          </p>

        )}

      </div>
    </div>
  );
};

export default TodoList;