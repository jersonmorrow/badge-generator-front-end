import React from 'react';

function SearchBadges(props) {
  const { query, setQuery } = props;

  return (
    <div className="field">
      <label className="label">Search Badges</label>
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Filter badges"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default SearchBadges;
