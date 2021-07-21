import axios from 'axios';

const client = axios.create({
    baseURL: 'https://api.unsplash.com/'
});

export default client;