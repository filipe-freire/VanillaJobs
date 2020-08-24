import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL_AUTHENTICATION_API}/job-post`,
  withCredentials: true
});

export const postJob = body =>
  api.post('/', body).then(response => response.data);

export const editJob = (id, body) =>
  api.patch(`/${id}`, body).then(response => response.data);
