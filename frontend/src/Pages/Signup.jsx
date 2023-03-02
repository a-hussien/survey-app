import { HiLockClosed } from 'react-icons/hi'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axiosClient from '../api/axios'
import { useStateContext } from '../Contexts/ContextProvider'

const Signup = () => {

    const { register, handleSubmit } = useForm()

    const { setAuthUser, setUserToken } = useStateContext()

    const [error, setError] = useState({__html: ''})

    const onSave = ({...data}) => {

        setError({__html: ''})
        // handle incoming request via axios
        axiosClient.post('/register', {...data})
        .then(({data}) => {
            setAuthUser(data?.user?.attributes)
            setUserToken(data?.token)
        })
        .catch((error) => {
            if(error.response){
                const responseErrors = Object.values(error.response.data.errors).reduce(
                    (accum, next) => [...accum, ...next], [])

                setError({__html: responseErrors.join('<br />')})
            }
        })
    }

  return (
    <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign up <span className='text-lg text-indigo-500'>It's Free !</span>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
            Or if you already have an account
            <Link to="/signin" className="ml-2 font-medium text-indigo-600 hover:text-indigo-500">
                Signin
            </Link>
        </p>

        {
            error.__html && (
                <div className='bg-red-400 py-3 px-4 mt-4 text-white rounded-md' dangerouslySetInnerHTML={error}></div>
            )
        }

        <form
        onSubmit={handleSubmit(onSave)}
        className="mt-8 space-y-6"
        method="POST"
        >
            <div className="-space-y-px rounded-md shadow-sm">
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
                        {...register("name")}
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
                        {...register("username")}
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
                        {...register("email")}
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
                        required
                        className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Password"
                        {...register("password")}
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
                        required
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Password Confirmation"
                        {...register("password_confirmation")}
                    />
                </div>
            </div>

            <div>
                <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <HiLockClosed className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                    Sign up
                </button>
            </div>
        </form>
    </div>
  )
}

export default Signup
