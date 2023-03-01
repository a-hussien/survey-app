import { Navigate, Outlet } from "react-router-dom"
import Logo from '../assets/logo.svg'
import { useStateContext } from "../Contexts/ContextProvider"

const GuestLayout = () => {

    const { token } = useStateContext()

    if(token)
    {
        return <Navigate to='/' />
    }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
            <div>
                <img
                    className="mx-auto h-20 w-auto"
                    src={Logo}
                    alt="Survey_Logo"
                />
            </div>

            <Outlet />
        </div>
    </div>
  )
}

export default GuestLayout
