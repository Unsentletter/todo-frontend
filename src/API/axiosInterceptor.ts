import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosStatic } from 'axios';

export default function (axios: AxiosStatic) {
  axios.interceptors.request.use(
    async (config) => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-type': 'application/json',
      };
      return config;
    },
    (error) => console.log('ERROR', error)
  );

  axios.interceptors.request.use(
    (response) => response,
    (error) => console.log('ERROR', error)
  );
}
