import axios from "axios"


const baseURL = axios.create({
    // baseURL: `${import.meta.env.VITE_BACKEND_URI}/api/v1`,
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true,
})


export default baseURL