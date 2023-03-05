import { createBrowserRouter, Navigate } from "react-router-dom"
import Dashboard from './Pages/Dashboard'
import Surveys from './Pages/Surveys'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Users from "./Pages/Users"
import NotFound from './Pages/NotFound'
import GuestLayout from "./Layouts/GuestLayout"
import DefaultLayout from "./Layouts/DefaultLayout"
import UserForm from "./Pages/UserForm"

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
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/create',
                element: <UserForm key="CreateUser" />
            },
            {
                path: '/users/:uuid',
                element: <UserForm key="EditUser" />
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
    {
        path: '*',
        element: <NotFound />
    },
])

export default router;
