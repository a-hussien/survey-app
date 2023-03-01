import { HiLockClosed } from 'react-icons/hi'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axiosClient from '../api/axios'
import { useStateContext } from '../Contexts/ContextProvider'

const Signin = () => {

    const { setUser, setUserToken } = useStateContext()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState({__html: ''})

    const onLogin = ({...data}) => {
        setError({__html: ''})

        axiosClient.post('/login', {...data})
        .then(({data}) => {
            setUser(data?.data?.user)
            setUserToken(data?.data?.token)
        })
        .catch((error) => {
            if(error.response){
                const responseErrors = Object.values(error.response.data.errors).reduce(
                    (accum, next) => [...accum, ...next], [])

                setError({__html: responseErrors.join('<br />')})
            }
            console.error(error)
        })

    }
  return (
    <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Create free account
            </Link>
        </p>

        {
            error.__html && (
                <div className='bg-red-400 py-3 px-4 mt-4 text-white rounded-md' dangerouslySetInnerHTML={error}></div>
            )
        }

        <form
        onSubmit={handleSubmit(onLogin)}
        className="mt-8 space-y-6"
        method="POST"
        >
            <div className="-space-y-px rounded-md shadow-sm">
                <div>
                    <label htmlFor="login" className="sr-only">
                        Login
                    </label>
                    <input
                        id="login"
                        name="login"
                        type="text"
                        autoComplete="login"
                        required
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Login with username or email"
                        {...register("login")}
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
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Password"
                        {...register("password")}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember"
                        name="remember"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        {...register("remember")}
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                        Remember me
                    </label>
                </div>

                {/*
                <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                    </a>
                </div>
                */}
            </div>

            <div>
                <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <HiLockClosed className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
                </button>
            </div>
        </form>
    </div>
  )
}

export default Signin
