import axios from "axios";

const axiosHelper = axios.create({
    baseURL: "http://54.91.68.46:8087",
    headers: {
        "Content-type":"application/json",
        
    }
})

export default axiosHelper
