import Login from "../Login/LoginForm";
import Signup from "../Login/Signup";
const publicRoutes = 
    [
        {
            path :'/',
            element : <Login/>
        },
        {
            path:'/signup',
            element: <Signup/>
        },
    ]

export default publicRoutes;