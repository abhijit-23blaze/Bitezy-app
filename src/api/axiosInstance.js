import axios from "axios";
import { server } from "../components/constants/config"; // Adjusted the import path

const axiosInstance = axios.create({
    baseURL: `${server}/api/v1/customer`,
    headers: {
        "Content-Type": "application/json",
    },
    // Removed withCredentials as it's not supported in React Native
});

export default axiosInstance;