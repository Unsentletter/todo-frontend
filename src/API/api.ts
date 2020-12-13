import axios from 'axios';
import axiosInterceptor from './axiosInterceptor';

axiosInterceptor(axios);

const SERVER_URL = `http://localhost:3000/api/`;

const API = (method: string, endPoint: string, params: any) => {
  const url = SERVER_URL + endPoint;

  switch (method) {
    case 'get':
      return axios.get(url, params);
    case 'post':
      return axios.post(url, params);
    case 'put':
      return axios.put(url, params);
    default:
      throw new Error(`Method "${method}" not supported`);
  }
};
export default API;
