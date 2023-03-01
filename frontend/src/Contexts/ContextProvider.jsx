import { createContext, useContext, useState } from 'react'

const StateContext = createContext({
    user: {},
    token: {},
    setUser: () => {},
    setToken: () => {}
})

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [token, setToken] = useState(localStorage.getItem('_token') || '')

    const setUserToken = (_token) => {
        _token ?
        localStorage.setItem('_token', _token):
        localStorage.removeItem('_token')

        setToken(_token)
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setUserToken
        }} >
            { children }
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
