import api from '../api/api';

export const fetchLogo = async (setEventLogo, props) => {
  const response = await api.events.read(props.match.params.eventId);
  const eventLogo = response.eventImage;
  if (eventLogo) {
    setEventLogo(`http://localhost:5000/${eventLogo}`);
  }
  localStorage.setItem('event-logo', eventLogo);
};
