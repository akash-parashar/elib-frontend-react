import {createBrowserRouter, Navigate} from "react-router-dom"
import LoginPage from "./pages/Login"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layouts/DashboardLayout";
import BooksPage from "./pages/BooksPage";
import CreateBook from "./pages/CreateBook";
import AuthLayout from "./layouts/AuthLayout";

 const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard/home" />,
    },
    {
            path:"dashboard",
            element:<DashboardLayout/>,
            children:[
                  {
                    path:"home",
                    element:<HomePage/>,
                  },
                  {
                    path:"books",
                    element:<BooksPage/>,
                  },
                  {
                    path:"books/create",
                    element:<CreateBook/>
                  }
                
            ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
        ],
    },
])

export default router;