import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BadgesList from '../features/badges/badgesList/index';
import api from '../api/api.js';
import PageLoading from '../features/loaders/pageLoading';
import PageError from './PageError';
import Loader from 'react-loader-spinner';
import { fetchLogo } from '../services/fetchLogo';
import defaultImage from '../assets/default-image.png';

function Badges(props) {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { eventId } = props.match.params;
  localStorage.setItem('event-id', eventId);
  const [eventLogo, setEventLogo] = useState(defaultImage);

  useEffect(() => {
    fetchData();
    fetchLogo(setEventLogo, props);

    let intervalId = setInterval(fetchData, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.badges.list(eventId);
      setData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError({ error: error });
    }
  };

  if (loading === true && !data) {
    return <PageLoading />;
  }

  if (error) {
    return <PageError error={error} />;
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-three-fifths is-offset-one-fifth">
            <div className="is-flex is-justify-content-flex-end	">
              <Link className="button is-success" to={`/${eventId}/new-badge`}>
                New Badge
              </Link>
            </div>
            <BadgesList eventLogo={eventLogo} badges={data} />
            <div className="is-flex is-justify-content-center">
              {loading && (
                <Loader
                  type="ThreeDots"
                  color="#00BFFF"
                  height={30}
                  width={30}
                  timeout={3000}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Badges;
