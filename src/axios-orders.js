import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-d2358.firebaseio.com/'
});

export default instance;