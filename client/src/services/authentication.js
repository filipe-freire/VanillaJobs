import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL_AUTHENTICATION_API}/authentication`
});

export const signUp = body => api.post('/sign-up', body).then(response => response.data);

export const signIn = body => api.post('/sign-in', body).then(response => response.data);
