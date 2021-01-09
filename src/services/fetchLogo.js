import api from '../api/api';

export const fetchLogo = async (setEventLogo, props) => {
  const response = await api.events.read(props.match.params.eventId);
  const eventLogo = response.eventImage;
  setEventLogo(eventLogo);
  localStorage.setItem('event-logo', eventLogo);
};
