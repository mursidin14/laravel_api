import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import GuestLayout from "../layouts/GuestLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";

export const router =  createBrowserRouter([
    {
        element: <DefaultLayout />,
        children: [
            {
                path:'/login',
                element:<Login />
            },
            {
                path:'/register',
                element:<Register />
            }
        ]
    },
    {
        element:<GuestLayout />,
        children: [
            {
                path:'/',
                element:<Home />
            },
            {
                path:'/aboute',
                element:<About />
            },
            {
                path:'/contacts/:id',
                element:<Contact />
            }
        ]
    },
    {
        path:'*',
        element:<NotFound />
    }
])
