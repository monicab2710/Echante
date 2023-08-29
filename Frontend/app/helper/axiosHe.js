import axios from "axios";

const axiosHelper = axios.create({
    baseURL: "http://localhost:8087",
    headers: {
        "Content-type":"application/json",
        
    }
})

export default axiosHelper
