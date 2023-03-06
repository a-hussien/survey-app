import { Navigate, Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar'
import { useStateContext } from '../Contexts/ContextProvider'
import { Toaster } from 'react-hot-toast'

const DefaultLayout = () => {

    const { token } = useStateContext()

    if(!token)
    {
        return <Navigate to='/signin' />
    }

  return (
    <div className="min-h-full">
        <NavBar />
        <Toaster />
        <Outlet />
    </div>
  )
}

export default DefaultLayout
