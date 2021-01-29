function useSetFormData() {
  const setFormData = (data, payload, imageUrl) => {
    const { title, organizer, location, date } = data;

    payload.append('title', title);
    payload.append('organizer', organizer);
    payload.append('location', location);
    payload.append('date', date);
    payload.append('eventImage', imageUrl);
  };

  return { setFormData };
}

export default useSetFormData;
