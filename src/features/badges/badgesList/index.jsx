import React from 'react';
import { Link } from 'react-router-dom';
import useSearchItem from '../../../hooks/useSearchItems';
// import BadgesListItem from '../badgesListItem';
import SearchBadges from '../searchBadges';

function BadgesList(props) {
  const { badges } = props;
  const { query, setQuery, filteredItems } = useSearchItem(badges);

  if (!filteredItems) {
    return (
      <div>
        <div className="columns">
          <div className="column">
            <SearchBadges query={query} setQuery={setQuery} />
          </div>
        </div>

        <h3>No Badges were found</h3>
        <Link className="button is-success" to="/new-badge">
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
          <p className="title is-5 ">Events</p>
        </strong>
      </div>
      <ul className="mb-4 content">
        {filteredItems.map((badgetItem) => {
          return (
            <li className="box" key={badgetItem._id}>
              <BadgeListItem badgeItem={badgetItem} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BadgesList;
