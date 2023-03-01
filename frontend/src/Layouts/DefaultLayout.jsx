import { Navigate, Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar'
import { useStateContext } from '../Contexts/ContextProvider'

const DefaultLayout = () => {

    const { authUser, token } = useStateContext()

    if(!token)
    {
        return <Navigate to='/signin' />
    }

  return (
    <div className="min-h-full">
        <NavBar user={authUser} />
        <Outlet />
    </div>
  )
}

export default DefaultLayout
