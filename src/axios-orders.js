import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-store.firebaseio.com/'
});

export default instance;
