import { Navigate, Outlet } from "react-router-dom"
import LogoImg from "../Components/LogoImg"
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
            <LogoImg imgClass='mx-auto h-20 w-auto' />

            <Outlet />
        </div>
    </div>
  )
}

export default GuestLayout
