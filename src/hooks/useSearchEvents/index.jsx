import { useState, useMemo } from 'react';

function useSearchEvents(events) {
  const [query, setQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(events);

  useMemo(async () => {
    try {
      const result = await events.filter((eventItem) => {
        return `${eventItem.title} ${eventItem.organizer}`
          .toLowerCase()
          .includes(query.toLowerCase());
      });
      setFilteredEvents(result);
    } catch (error) {
      console.log(error);
    }
  }, [events, query]);

  return { query, setQuery, filteredEvents };
}

export default useSearchEvents;
