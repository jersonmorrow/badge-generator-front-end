import React, { createRef, useState, useEffect } from 'react';
import defaultBackgroundImage from '../assets/default-background-image.png';
import defaultImage from '../assets/default-image.png';
import Badge from '../features/badges/badge';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Loader from 'react-loader-spinner';
import api from '../api/api.js';
import PageError from '../pages/PageError';

function BadgeDetails(props) {
  const [badge, setBadge] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    categorie: '',
    badgeImage: '',
  });

  const { badgeId } = props.match.params;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [picture, setPicture] = useState(defaultImage);
  const eventId = localStorage.getItem('event-id');
  const componentRef = createRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    const getEventLogo = () => {
      const eventLogo = localStorage.getItem('event-logo');
      if (eventLogo !== 'undefined') {
        setPicture(`http://localhost:5000/${eventLogo}`);
      }
    };

    getEventLogo();

    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.badges.read(badgeId);
      setBadge(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError({ error: error });
    }
  };

  if (error) {
    return <PageError error={error} />;
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column"></div>
          <div className="column is-one-third">
            {loading ? (
              <div className="is-flex is-justify-content-center is-align-content-center is-align-items-center pt-6">
                <Loader
                  type="Oval"
                  color="#00BFFF"
                  height={40}
                  width={40}
                  timeout={3000}
                />
              </div>
            ) : (
              <Badge
                ref={componentRef}
                firstName={badge.firstName || 'FIRST NAME'}
                lastName={badge.lastName || 'LAST NAME'}
                email={badge.email || 'EMAIL'}
                jobTitle={badge.jobTitle || 'JOBTITLE'}
                categorie={badge.categorie || 'CATEGORIE'}
                badgeImage={badge.badgeImage || defaultBackgroundImage}
                eventLogo={picture}
              />
            )}
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
