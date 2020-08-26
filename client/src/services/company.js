import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL_AUTHENTICATION_API}/user`,
  withCredentials: true
});

export const editUser = (id, body) => {
  const formBody = new window.FormData();

  for (let key in body) {
    formBody.append(key, body[key]);
  }

  /*formBody.append('summary', body.summary);
  formBody.append('companyName', body.companyName);
  formBody.append('location', body.location);
  formBody.append('foundedDate', body.foundedDate);
  formBody.append('websiteUrl', body.websiteUrl);
  formBody.append('sizeInEmployees', body.sizeInEmployees);
  formBody.append('email', body.email);
  formBody.append('photo', body.logo);
  */
  return api.patch(`/${id}`, formBody).then(response => response.data);
};

export const loadUser = id => api.get(`/${id}`).then(response => response.data);

export const loadAllUsers = () => api.get(`/listAll`).then(response => response.data);
