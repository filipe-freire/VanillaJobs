import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL_AUTHENTICATION_API}/company`,
  withCredentials: true
});

export const loadUser = () => api.get(`/me`).then(response => response.data);

// FIX IT!
export const editUser = (id, body) =>
  api.patch(`/user/${id}`, body).then(response => response.data);
