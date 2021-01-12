import React, { useRef, createRef } from 'react';
import defaultBackgroundImage from '../assets/default-background-image.jpg';
import defaultImage from '../assets/default-image.png';
import Badge from '../features/badges/badge';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

function BadgeDetails(props) {
  const { badgeData } = props.location.aboutProps;
  const eventLogo = localStorage.getItem('event-logo');
  const eventId = localStorage.getItem('event-id');
  const componentRef = createRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column"></div>
          <div className="column is-one-third">
            <Badge
              ref={componentRef}
              firstName={badgeData.firstName || 'FIRST NAME'}
              lastName={badgeData.lastName || 'LAST NAME'}
              email={badgeData.email || 'EMAIL'}
              jobTitle={badgeData.jobTitle || 'JOBTITLE'}
              categorie={badgeData.categorie || 'CATEGORIE'}
              badgeImage={badgeData.badgeImage || defaultBackgroundImage}
              eventLogo={eventLogo || defaultImage}
            />
          </div>
          <div className="field is-grouped">
            <Link to={`/${eventId}/badges`} className="control">
              <button className="button is-danger is-normal">Cancel</button>
            </Link>

            <p className="control">
              <button
                onClick={handlePrint}
                className="button is-success is-normal"
              >
                Print
              </button>
            </p>
          </div>
          <div className="column"></div>
        </div>
      </div>
    </section>
  );
}

export default BadgeDetails;
