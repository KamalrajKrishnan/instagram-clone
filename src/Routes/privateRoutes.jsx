import Counter from "../Counter/Counter";
import CourseList from "../Course/CourseList";
import TodoList from '../Todo/TodoList';
import TodoDetails from "../Todo/TodoDetails";

const privateRoutes = 
    [ 
        {
            path: "/courses",
            element: <CourseList />,
        },
        {
            path: "/counterapp",
            element: <Counter />,
        },
        {
            path: "/todoapp",
            element: <TodoList />,
        },
        {
            path: "/todoDetails/:id",
            element: <TodoDetails />,
        },
];

export default privateRoutes;