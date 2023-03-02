import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://api.freebeauty24.ru/',
    baseURL: 'http://127.0.0.1:8000/',
    withCredentials: true,

});

export default instance;