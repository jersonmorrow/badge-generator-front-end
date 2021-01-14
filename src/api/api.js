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
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      return callApi('/events/', config);
    },
    async create(event) {
      const data = event;
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': await localStorage.getItem('auth-token'),
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
    async update(eventId, updates) {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': await localStorage.getItem('auth-token'),
        },
        method: 'PATCH',
        data: updates,
      };
      return callApi(`/events/update/${eventId}`, config);
    },
    async remove(eventId) {
      const config = {
        headers: {
          'x-auth-token': await localStorage.getItem('auth-token'),
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
    async update(updates, badgeId) {
      const config = {
        headers: {
          'x-auth-token': await localStorage.getItem('auth-token'),
        },
        method: 'PATCH',
        data: updates,
      };
      return callApi(`/badges/update/${badgeId}`, config);
    },
    async remove(badgeId) {
      const config = {
        headers: {
          'x-auth-token': await localStorage.getItem('auth-token'),
        },
        method: 'DELETE',
      };
      return callApi(`/badges/delete/${badgeId}`, config);
    },
  },
};

export default api;
