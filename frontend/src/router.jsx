import { createBrowserRouter, Navigate } from "react-router-dom"
import Dashboard from './Pages/Dashboard'
import Surveys from './Pages/Surveys'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import GuestLayout from "./Layouts/GuestLayout"
import DefaultLayout from "./Layouts/DefaultLayout"

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children:
        [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/dashboard',
                element: <Navigate to="/" />
            },
            {
                path: '/surveys',
                element: <Surveys />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children:
        [
            {
                path: '/signin',
                element: <Signin />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
])

export default router;
