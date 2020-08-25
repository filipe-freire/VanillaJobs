import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL_AUTHENTICATION_API}/user`,
  withCredentials: true
});

export const editUser = (id, body) => api.patch(`/${id}`, body).then(response => response.data);

export const loadUser = id => api.get(`/${id}`).then(response => response.data);

export const loadAllUsers = () => api.get(`/listAll`).then(response => response.data);
