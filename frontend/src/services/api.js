import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',   //port of backend listening
})

export default api;