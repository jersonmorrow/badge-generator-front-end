import Axios from 'axios';

let token = localStorage.getItem('auth-token');

const instance = Axios.create({
  baseURL: 'http://localhost:5000',
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
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
        method: 'POST',
        data: data,
      };
      return callApi('/events/new-event', config);
    },
  },
};

export default api;
