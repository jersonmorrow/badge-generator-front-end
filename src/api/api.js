import Axios from 'axios';
import config from '../config/index';

const instance = Axios.create({
  baseURL: `${config.apiUrl}`,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

async function callApi(endpoint, options) {
  const response = await instance(endpoint, options);
  const data = await response.data;

  return data;
}

const api = {
  events: {
    list() {
      const config = {
        method: 'GET',
      };
      return callApi('/events/', config);
    },
    create(event) {
      const data = event;
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        data: data,
      };
      return callApi('/events/new-event', config);
    },
    read(eventId) {
      return callApi(`/events/${eventId}`);
    },
    update(eventId, updates) {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        method: 'PATCH',
        data: updates,
      };
      return callApi(`/events/update/${eventId}`, config);
    },
    remove(eventId) {
      const config = {
        method: 'DELETE',
      };
      return callApi(`/events/delete/${eventId}`, config);
    },
  },
  badges: {
    list(eventId) {
      const config = {
        method: 'GET',
      };
      return callApi(`/badges/${eventId}`, config);
    },
    create(badge, eventId) {
      const data = badge;
      const config = {
        method: 'POST',
        data: data,
      };
      return callApi(`/badges/new-badge/${eventId}`, config);
    },
    read(badgeId) {
      return callApi(`/badges/badge/${badgeId}`);
    },
    update(updates, badgeId) {
      const config = {
        method: 'PATCH',
        data: updates,
      };
      return callApi(`/badges/update/${badgeId}`, config);
    },
    remove(badgeId) {
      const config = {
        method: 'DELETE',
      };
      return callApi(`/badges/delete/${badgeId}`, config);
    },
  },
};

export default api;
