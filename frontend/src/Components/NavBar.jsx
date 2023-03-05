import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { HiBars3, HiUserCircle, HiXMark } from 'react-icons/hi2'
import { NavLink } from 'react-router-dom'
import { useStateContext } from '../Contexts/ContextProvider'
import axiosClient from '../api/axios'
import LogoImg from './LogoImg'

const navigation = [
    { name: 'Dashboard', to: '/' },
    { name: 'Users', to: '/users' },
    { name: 'Surveys', to: '/surveys' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const NavBar = () => {

    const { authUser, setAuthUser, setUserToken } = useStateContext()

    useEffect(() => {
        axiosClient.get('/user').then(({data}) => {
            setAuthUser(data?.user?.attributes)
        })
    }, [])

    const Logout = (e) => {
        e.preventDefault()
        axiosClient.post('/logout').then( () => {
            setAuthUser({})
            setUserToken('')
        })
    }

  return (
    <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
        <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                <div className="flex-shrink-0">
                    <LogoImg imgClass='h-14 w-14' />
                </div>
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                        <NavLink
                        key={item.name}
                        to={item.to}
                        className={({isActive}) => classNames(
                            isActive
                            ? 'bg-indigo-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        >
                        {item.name}
                        </NavLink>
                    ))}
                    </div>
                </div>
                </div>
                <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                    <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                    <span className="sr-only">View notifications</span>
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                    <div className='flex flex-row-reverse items-center justify-end'>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <HiUserCircle className="h-8 w-8 text-white rounded-full" />
                        </Menu.Button>
                        <div className="flex flex-col justify-center items-center text-sm">
                            <span className='block text-white font-medium'>{authUser?.name}</span>
                            <span className='-mt-[0.3rem] text-white/50 font-thin'>{authUser?.email}</span>
                        </div>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                <a
                                href="#"
                                className='block px-4 py-2 text-sm text-gray-700'
                                onClick={Logout}
                                >
                                Sign Out
                                </a>
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                    </Menu>
                </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                    <HiXMark className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                    <HiBars3 className="block h-6 w-6" aria-hidden="true" />
                    )}
                </Disclosure.Button>
                </div>
            </div>
            </div>

            <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {navigation.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.to}
                    className={({isActive}) => classNames(
                    isActive ? 'bg-indigo-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                >
                    {item.name}
                </NavLink>
                ))}
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                    <HiUserCircle className="h-10 w-10 text-white rounded-full" />
                </div>
                <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">{authUser?.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-400">{authUser?.email}</div>
                </div>
                <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                <span className="sr-only">View notifications</span>
                </button>
                </div>
                <div className="mt-3 space-y-1 px-2">

                <Disclosure.Button
                as="a"
                href="#"
                onClick={Logout}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                Sign Out
                </Disclosure.Button>

                </div>
            </div>
            </Disclosure.Panel>
        </>
        )}
    </Disclosure>
  )
}

export default NavBar
