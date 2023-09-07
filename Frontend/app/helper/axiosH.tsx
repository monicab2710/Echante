import axios from "axios";

const axiosH = axios.create({
    baseURL: "http://3.81.126.14:8081/api/v1",
    headers: {
        "Content-type":"application/json",
        
    }
})

export default axiosH
