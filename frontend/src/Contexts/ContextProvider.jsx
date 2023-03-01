import { createContext, useContext, useState } from 'react'

const StateContext = createContext({
    authUser: {},
    token: null,
    setAuthUser: () => {},
    setToken: () => {}
})

export const ContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState({})
    const [token, setToken] = useState(localStorage.getItem('_token') || '')

    const setUserToken = (_token) => {
        _token ?
        localStorage.setItem('_token', _token):
        localStorage.removeItem('_token')

        setToken(_token)
    }

    return (
        <StateContext.Provider value={{
            authUser,
            token,
            setAuthUser,
            setUserToken
        }} >
            { children }
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
