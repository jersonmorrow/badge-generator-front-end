import React, { useState, useEffect, useMemo } from 'react';
import Badge from '../features/badges/badge';
import BadgeForm from '../features/badges/badgeForm';
import defaultImage from '../assets/default-image.png';
import api from '../api/api.js';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import defaultBackgroundImage from '../assets/default-background-image.png';
import Loader from 'react-loader-spinner';

function BadgeEdit(props) {
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

  const eventLogo = localStorage.getItem('event-logo');
  const eventId = localStorage.getItem('event-id');
  const history = useHistory();

  const { register, handleSubmit, errors, formState, watch, reset } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    values: useMemo(() => badge, [badge]),
  });

  const watchAllFields = watch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.badges.read(badgeId);
      setBadge(data);
      setLoading(false);
      reset(data);
    } catch (error) {
      setLoading(false);
      setError({ error: error });
    }
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(data);

    try {
      await api.badges.update(data, badgeId);
      setLoading(false);

      history.push(`/${eventId}/badges`);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

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
                firstName={watchAllFields.firstName || 'First Name'}
                lastName={watchAllFields.lastName || 'last Name'}
                email={watchAllFields.email || 'Email'}
                jobTitle={watchAllFields.jobTitle || 'jobTitle'}
                categorie={watchAllFields.categorie || 'Categorie'}
                badgeImage={watchAllFields.badgeImage || defaultBackgroundImage}
                eventLogo={eventLogo || defaultImage}
              />
            )}
          </div>
          <div className="column is-two-fifths">
            <p className="title is-3">Edit Badge</p>
            <BadgeForm
              onSubmit={onSubmit}
              register={register}
              onSubmit={handleSubmit(onSubmit)}
              errors={errors}
              formState={formState}
              eventId={eventId}
            />
          </div>

          <div className="column"></div>
        </div>
      </div>
    </section>
  );
}

export default BadgeEdit;
