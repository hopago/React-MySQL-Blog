import axios from 'axios';

export const baseReq = axios.create({
    baseURL: "http://localhost:8000/api/",
});

export const authReq = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
});