import React from 'react';

function SearchEvents(props) {
  const { query, setQuery } = props;

  return (
    <div className="field">
      <label className="label">Search Events</label>
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Filter an Event"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default SearchEvents;
