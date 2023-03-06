import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../api/axios"
import PageComponent from "../Components/PageComponent"
import { AiOutlineUserAdd } from "react-icons/ai"
import Loading from "../Components/Loading"
import toast from "react-hot-toast"
import { Confirm } from "notiflix/build/notiflix-confirm-aio"

const Users = () => {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchAllUsers()
    }, [])

    const fetchAllUsers = async () => {
        setIsLoading(true)
        await axiosClient.get('/users')
        .then(({data}) => {
            setIsLoading(false)
            setUsers(data.data)
            console.log(data)
        })
        .catch(() => {
            setIsLoading(false)
        })
    }


    const RemoveUser = (e, user) => {
        e.preventDefault()
        Confirm.show(
            'Delete user confirmation',
            `Are you sure you want to delete user <b>${user.attributes.name}</b>?`,
            'Yes',
            'No',
            () => {
                axiosClient.delete(`/users/${user.attributes.uuid}`)
                .then(() => {
                    toast.success('User deleted')
                    fetchAllUsers()
                })
            },
            () => {
                return
            },
            {
                titleColor: '#eb4d4b',
                okButtonBackground: '#ff7675',
                cssAnimationStyle: 'zoom',
                plainText: false,
            }
        )
    }

  return (
    <PageComponent title="Users">
        <section className="flex flex-col gap-y-6">

            <div className="overflow-hidden bg-white drop-shadow-md sm:rounded-lg">

                <div className="flex flex-row-reverse items-center gap-x-8 px-4 py-5 sm:px-6">
                    <button className="group relative flex justify-center items-center rounded-md border border-transparent bg-emerald-400 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                        <span className="absolute inset-y-0 left-1 flex items-center">
                            <AiOutlineUserAdd className="h-5 w-5 text-emerald-300 group-hover:text-emerald-300" aria-hidden="true" />
                        </span>
                        <Link to="/users/create" className="ml-2">Create</Link>
                    </button>

                    <div className="w-full h-16 bg-slate-400 rounded-md text-center">
                        Filters
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <div className="flex items-center font-sans overflow-hidden">
                        <div className="w-full p-4">
                            <div className="bg-white shadow-md">
                                <table className="min-w-max w-full table-auto">
                                    <thead>
                                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                            <th className="py-3 px-6 text-left">#</th>
                                            <th className="py-3 px-6 text-left">Name</th>
                                            <th className="py-3 px-6 text-center">Email</th>
                                            <th className="py-3 px-6 text-center">Status</th>
                                            <th className="py-3 px-6 text-center">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-gray-600 text-sm font-light">
                                    {
                                        isLoading ? <Loading model="table" /> :
                                        users?.map((user, i) => (
                                            <tr key={++i} className="border-b border-gray-200 hover:bg-gray-100">
                                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                                    <span className="font-medium">{++i}</span>
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    <span className="font-medium">{user.attributes.name}</span>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <span className="font-medium">{user.attributes.email}</span>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">Active</span>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-center">
                                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                                                        <Link to={`/users/${user.attributes.uuid}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                        </Link>
                                                    </div>
                                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                                        onClick={(e) => RemoveUser(e,user)}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        ))
                                    }
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </PageComponent>
  )
}

export default Users
