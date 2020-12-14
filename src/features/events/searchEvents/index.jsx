import React from 'react';

function SearchEvents() {
  return (
    <div className="field">
      <label className="label">Search Events</label>
      <div className="control">
        <input className="input" type="text" placeholder="Find an Event" />
      </div>
    </div>
  );
}

export default SearchEvents;
