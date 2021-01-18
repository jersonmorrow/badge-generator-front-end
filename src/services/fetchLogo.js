import api from '../api/api';
import config from '../config/index';

export const fetchLogo = async (setEventLogo, props) => {
  const response = await api.events.read(props.match.params.eventId);
  const eventLogo = response.eventImage;
  if (eventLogo) {
    setEventLogo(`${config.apiUrl}/${eventLogo}`);
  }
  localStorage.setItem('event-logo', eventLogo);
};
