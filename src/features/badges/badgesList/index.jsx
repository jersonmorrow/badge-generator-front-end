import React from 'react';
import { Link } from 'react-router-dom';
import useSearchItem from '../../../hooks/useSearchItems';
import BadgesListItem from '../badgesListItem';
import SearchBadges from '../searchBadges';

function BadgesList(props) {
  const { badges, eventLogo } = props;
  const { query, setQuery, filteredItems } = useSearchItem(badges);
  const eventId = localStorage.getItem('event-id');

  if (filteredItems.length === 0) {
    return (
      <div>
        <div className="columns">
          <div className="column">
            <SearchBadges query={query} setQuery={setQuery} />
          </div>
        </div>

        <h3>No Badges were found, let's create a new badge</h3>
        <Link className="button is-success" to={`/${eventId}/new-badge`}>
          New Badge
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="columns">
        <div className="column">
          <SearchBadges query={query} setQuery={setQuery} />
        </div>
      </div>
      <div className="mb-4">
        <strong>
          <p className="title is-5 ">Badges</p>
        </strong>
      </div>
      <ul className="mb-4 content">
        {filteredItems.map((badgeItem) => {
          return (
            <li className="box" key={badgeItem._id}>
              <Link to={`/badges/${badgeItem._id}`}>
                <BadgesListItem eventLogo={eventLogo} badgeItem={badgeItem} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BadgesList;
