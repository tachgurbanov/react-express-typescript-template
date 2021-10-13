import axios from 'axios'
import { getToken, logout } from "./auth"

// Base url
const api = axios.create({
    baseURL: 'http://localhost:3333'
})


// Middleware 
api.interceptors.request.use(async config => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})


// Middleware 
api.interceptors.response.use((response) => {
   
    return response;
}, (error) => {

    let status = error.response.status
    let path = window.location.pathname
    
    if (path !== '/login' && status === 401) {
        logout();
        document.location.reload()
    }
 
    return Promise.reject(error);
});


export default api