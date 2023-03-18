import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../api/axios"
import PageComponent from "../Components/PageComponent"
import { AiOutlineUserAdd, AiOutlineUserSwitch } from "react-icons/ai"
import toast from "react-hot-toast"
import { Block } from "notiflix/build/notiflix-block-aio"
import { Loading } from "notiflix/build/notiflix-loading-aio"

const UserForm = () => {

    const { uuid } = useParams()
    const navigate = useNavigate()
    const [user, setUser ] = useState({
        uuid: null,
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const [error, setError] = useState({__html: ''})
    const [title, setTitle] = useState('Create New User')

    if(uuid) {
        useEffect(() => {
            Block.circle('.user__form')
            getUser()
        }, [])
    }

    const getUser = async () => {
        await axiosClient.get(`/users/${uuid}`)
        .then(({data}) => {
            setUser(data?.user?.attributes)
            setTitle(`Update: ${data?.user?.attributes.name}`)
        })
        .finally(() => {
            Block.remove('.user__form')
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError({__html: ''})
        Loading.standard()

        if(user?.uuid) {
            // update user
            axiosClient.patch(`/users/${user?.uuid}`, user)
            .then(() => {
                toast.success('User updated')
                navigate('/users')
            })
            .catch((error) => {
                if(error.response){
                    const responseErrors = Object.values(error.response.data.errors).reduce(
                        (accum, next) => [...accum, ...next], [])
                    setError({__html: responseErrors.join('<br />')})
                }
            })
            .finally(() => {
                Loading.remove()
            })
        }else {
            // create user
            axiosClient.post('/users', user)
            .then(() => {
                toast.success('User created')
                navigate('/users')
            })
            .catch((error) => {
                if(error.response){
                    const responseErrors = Object.values(error.response.data.errors).reduce(
                        (accum, next) => [...accum, ...next], [])
                    setError({__html: responseErrors.join('<br />')})
                }
            })
            .finally(() => {
                Loading.remove()
            })
        }
    }

  return (
    <PageComponent title={title}>
        <div className="flex items-center justify-center gap-12">
            <form
            onSubmit={handleSubmit}
            className="w-1/2 mt-8 space-y-6"
            method="POST"
            >
                <div className="user__form -space-y-px rounded-md shadow-sm">
                    <div>
                        <label htmlFor="full-name" className="sr-only">
                            Full Name
                        </label>
                        <input
                            id="full-name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Full Name"
                            value={user.name}
                            onChange={(e) => setUser({...user, name:e.target.value})}
                        />
                    </div>
                    <div>
                        <label htmlFor="user-name" className="sr-only">
                            User Name
                        </label>
                        <input
                            id="user-name"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="User Name"
                            value={user.username}
                            onChange={(e) => setUser({...user, username:e.target.value})}
                        />
                    </div>
                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Email address"
                            value={user.email}
                            onChange={(e) => setUser({...user, email:e.target.value})}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password"
                            onChange={(e) => setUser({...user, password:e.target.value})}
                        />
                    </div>
                    <div>
                        <label htmlFor="password-confirmation" className="sr-only">
                            Confirm Password
                        </label>
                        <input
                            id="password-confirmation"
                            name="password_confirmation"
                            type="password"
                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password Confirmation"
                            onChange={(e) => setUser({...user, password_confirmation:e.target.value})}
                        />
                    </div>
                </div>

                <div>
                    <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    {user?.uuid ? (<AiOutlineUserSwitch className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />): (<AiOutlineUserAdd className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />)}

                    </span>
                       {user?.uuid ? 'Update': 'Create'}
                    </button>
                </div>
            </form>

            <div className="w-1/2 flex">
                {
                    error.__html && (
                        <div className='space-y-6 bg-red-400 py-3 px-4 text-white rounded-md' dangerouslySetInnerHTML={error}></div>
                    )
                }
            </div>
        </div>
    </PageComponent>
  )
}

export default UserForm
