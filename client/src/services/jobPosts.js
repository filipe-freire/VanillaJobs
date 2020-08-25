import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL_AUTHENTICATION_API}/job-post`,
  withCredentials: true
});

export const postJob = body => api.post('/', body).then(response => response.data);

export const editJob = (id, body) => api.patch(`/${id}`, body).then(response => response.data);

export const loadJob = id => api.get(`/${id}`).then(response => response.data);

export const deleteJob = id => api.delete(`/${id}`).then(response => response.data);
//

export const loadAll = () => api.get('all').then(response => response.data);

export const loadAllByCreatorId = id => api.get(`creator/${id}`).then(response => response.data);
