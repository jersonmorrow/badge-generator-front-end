import React, { forwardRef } from 'react';
import './index.css';

const Badge = forwardRef((props, componentRef) => {
  const {
    firstName,
    lastName,
    email,
    jobTitle,
    categorie,
    badgeImage,
    eventLogo,
  } = props;

  const badgeBackground = {
    backgroundImage: 'url(' + badgeImage + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  return (
    <div
      ref={componentRef}
      className="badge is-flex px-5	is-flex-direction-column is-justify-content-space-evenly is-align-items-flex-start"
      style={badgeBackground}
    >
      <div>
        <figure className="image is-96x96">
          <img className="is-rounded" src={eventLogo} />
        </figure>
      </div>
      <div>
        <p className="title m-0 is-2">{firstName}</p>
        <p className="title m-0 is-2">{lastName}</p>
      </div>

      <div>
        <p>{email}</p>
        <p>{jobTitle}</p>
        <p className="mt-3">
          <span class="tag is-primary is-light is-medium">{categorie}</span>
        </p>
      </div>
    </div>
  );
});

export default Badge;
