import axios from "axios";

const axiosHelper = axios.create({
    baseURL: "http://34.229.48.113:8082",
    headers: {
        "Content-type":"application/json",
        
    }
})

export default axiosHelper
