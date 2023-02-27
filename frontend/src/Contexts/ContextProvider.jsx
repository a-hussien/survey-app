import { createContext, useContext, useState } from 'react'

const StateContext = createContext({
    user: {},
    token: {},
    setUser: () => {},
    setToken: () => {}
})

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: 'Ahmed Hussein',
        email: 'test@test.com',
    })

    const [token, setToken] = useState(null)

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }} >
            { children }
        </StateContext.Provider>
    )
}

export const UserStateContext = () => useContext(StateContext)
