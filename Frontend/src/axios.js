// import axios from "axios";
// import { response } from "express";
// import _ from "lodash";

// const instance = axios.create({
//     baseURL: process.env.REACT_APP_BACKEND_URL
// })
// instance.interceptors.response.use(
//     (response) => {
//         const { data } = response;
//         return response.data;
//     }
// );
// export default instance;
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    config => {
        console.log('Sending request:', config);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        console.log('Received response:', response.data.errCode);

        return response;
    },
    error => {
        console.error('Error response:', error.response ? error.response.data : error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;
