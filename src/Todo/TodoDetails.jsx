import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const TodoDetails = () => {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    getTodoList();
  }, []);

  // Find todo based on URL id
  const selectedTodo = todoList.find(
    (todo) => todo._id === id
  );

  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{ duration: 2500 }}
      />

      <div className="mx-auto w-full max-w-xl bg-white p-6 shadow-xl">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Todo Details
        </h1>

        <hr className="my-6 border-gray-200" />

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-green-500"></div>

            <span className="ml-3 text-sm text-gray-500">
              Loading todo...
            </span>
          </div>
        ) : selectedTodo ? (
          <div className="rounded-lg border bg-gray-50 p-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedTodo.title}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              ID: {selectedTodo._id}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Created:{" "}
              {new Date(selectedTodo.createdAt).toLocaleString()}
            </p>

            <button
              onClick={() => navigate("/todoapp")}
              className="mt-5 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Back to Todo List
            </button>
          </div>
        ) : (
          <p className="bg-gray-50 px-4 py-6 text-center text-sm text-red-400">
            Todo not found.
          </p>
        )}
      </div>
    </div>
  );
};

export default TodoDetails;