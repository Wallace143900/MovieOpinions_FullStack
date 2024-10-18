import axios from "axios"

export const api = axios.create ({
    baseURL: "https://movieopinions.onrender.com",
    timeout: 10000,
})