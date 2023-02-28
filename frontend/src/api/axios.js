import axios from 'axios'
import router from '../router'

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
})

// request
axiosClient.interceptors.request.use((config) => {
    const token = 'xyz123'
    config.headers.Authorization = `Bearer ${token}`
})

// response
axiosClient.interceptors.response.use(response => {
    return response
}, error => {
    if(error.response && error.response.status === 401){
        router.navigate('/signin')
        return error
    }

    throw error
})

export default axiosClient
