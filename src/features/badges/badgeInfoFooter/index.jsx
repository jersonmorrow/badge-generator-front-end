import React from 'react';

function BadgeInfoFooter(props) {
  const { eventData } = props;

  return (
    <div className="tabs is-centered mt-6">
      <ul>
        <li>
          <span class="icon is-small">
            <i class="fas fa-calendar-alt" aria-hidden="true"></i>
          </span>
          <span>{eventData.title}</span>
        </li>
      </ul>
      <ul>
        <li>
          <span class="icon is-small">
            <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
          </span>
          <span>{eventData.location}</span>
        </li>
      </ul>
    </div>
  );
}

export default BadgeInfoFooter;
