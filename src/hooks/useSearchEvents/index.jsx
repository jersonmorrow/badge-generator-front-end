import React, { useState, useMemo } from 'react';

function useSearchEvents(events) {
  const [query, setQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(events);

  useMemo(() => {
    const result = events.filter((events) => {
      return `${eventItem.title}`.toLowerCase().includes(query.toLowerCase());
    });

    setFilteredEvents(result);
  }, [events, query]);

  return { query, setQuery, filteredEvents };
}

export default useSearchEvents;
