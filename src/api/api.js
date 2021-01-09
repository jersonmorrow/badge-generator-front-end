import Axios from 'axios';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max));

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
    async list() {
      const config = {
        method: 'GET',
        headers: {
          'x-auth-token': await localStorage.getItem('auth-token'),
        },
      };
      return callApi('/events/', config);
    },
    create(event, token) {
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
    async read(eventId) {
      const config = {
        headers: {
          'x-auth-token': await localStorage.getItem('auth-token'),
        },
      };
      return callApi(`/events/${eventId}`, config);
    },
    update(eventId, updates, token) {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
        method: 'PATCH',
        data: updates,
      };
      return callApi(`/events/update/${eventId}`, config);
    },
    remove(eventId, token) {
      const config = {
        headers: {
          'x-auth-token': token,
        },
        method: 'DELETE',
      };
      return callApi(`/events/delete/${eventId}`, config);
    },
  },
  badges: {
    async list(eventId) {
      const config = {
        method: 'GET',
        headers: {
          'x-auth-token': await localStorage.getItem('auth-token'),
        },
      };
      return callApi(`/badges/${eventId}`, config);
    },
    async create(badge, eventId) {
      const data = badge;
      const config = {
        headers: {
          'x-auth-token': await localStorage.getItem('auth-token'),
        },
        method: 'POST',
        data: data,
      };
      return callApi(`/badges/new-badge/${eventId}`, config);
    },
  },
};

export default api;
