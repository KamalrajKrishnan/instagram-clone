import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './Routes/Routes';
const router = createBrowserRouter(routes);
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <RouterProvider router={router}/>       
    </div>
  );
}

export default App;
