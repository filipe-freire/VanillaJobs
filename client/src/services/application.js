import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL_AUTHENTICATION_API}/job-application`, //endpoint of the router handler in app.js
  withCredentials: true
});

// endpoint inside the jobApplication route
export const submitApplication = body =>
  api.post('/submitApplication', body).then(response => response.data);
