import axios from 'axios';
import { config } from "../config";

const { SERVER_URL } = config;

axios.defaults.baseURL = SERVER_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const createUser = async (user) => {
  try {
    const res = await axios.post('/api/users', user);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getToken = async (user) => {
  try {
    const res = await axios.post('/api/users/getToken', user);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getUser = async (user) => {
  try {
    const res = await axios.get('/api/users/getUser');
    return res;
  } catch (err) {
    return err.response;
  }
};
