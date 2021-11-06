import axios from 'axios';
import { WEB_API_KEY } from '@env';

export const registerInstance = axios.create({
  baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${WEB_API_KEY}`,
});

export const loginInstance = axios.create({
  baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEB_API_KEY}`,
});

export const getUserInstance = axios.create({
  baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${WEB_API_KEY}`,
});

export const exchangeTokenInstance = axios.create({
  baseURL: `https://securetoken.googleapis.com/v1/token?key=${WEB_API_KEY}`,
});

export const changePasswordInstance = axios.create({
  baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${WEB_API_KEY}`,
});
