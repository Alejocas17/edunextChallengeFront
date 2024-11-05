import axios from 'axios';


// Create an Axios instance
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8020', 
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
});

export const axiosInstanceMicroService = axios.create({
    baseURL: 'http://localhost:8010/api/v1', 
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
});

// Response interceptor
axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // Do something with response error
        return Promise.reject(error);
    }
);
axiosInstanceMicroService.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // Do something with response error
        return Promise.reject(error);
    }
);