import Axios from 'axios';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max));

let token = localStorage.getItem('auth-token');

const instance = Axios.create({
  baseURL: 'http://localhost:5000',
});

async function callApi(endpoint, options) {
  await simulateNetworkLatency();

  const response = await instance(endpoint, options);
  const data = await response.data;

  return data;
}

const api = {
  events: {
    list() {
      const config = {
        headers: {
          'x-auth-token': token,
        },
        method: 'GET',
      };
      return callApi('/events/', config);
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
    remove(eventId) {
      const config = {
        headers: {
          'x-auth-token': token,
        },
        method: 'DELETE',
      };
      return callApi(`/events/delete/${eventId}`, config);
    },
  },
};

export default api;
