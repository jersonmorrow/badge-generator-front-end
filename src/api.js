import Axios from 'axios';

let token = localStorage.getItem('auth-token');

const instance = Axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-auth-token': token,
  },
});

async function callApi(endpoint, options) {
  const response = await instance(endpoint, options);
  const data = await response.data;

  return data;
}

const api = {
  events: {
    list() {
      return callApi('/events');
    },
    create(event) {
      const data = event;
      return callApi('/events/new-event', { method: 'POST', data });
    },
  },
};

export default api;
