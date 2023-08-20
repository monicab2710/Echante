import axios from "axios";

const axiosHelper = axios.create({
    baseURL: "http://localhost:8082",
    headers: {
        "Content-type":"application/json",
        
    }
})

export default axiosHelper
