import React, { useState, useEffect } from 'react';
import Badge from '../features/badges/badge';
import BadgeForm from '../features/badges/badgeForm';
import defaultImage from '../assets/default-image.png';
import api from '../api/api.js';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import defaultBackgroundImage from '../assets/default-background-image.jpg';

function BadgeEdit(props) {
  const [badge] = useState(props.location.aboutProps.data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { badgeId } = props.match.params;
  const eventLogo = localStorage.getItem('event-logo');
  const eventId = localStorage.getItem('event-id');
  const history = useHistory();

  const { register, handleSubmit, errors, formState, watch } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: badge.firstName,
      lastName: badge.lastName,
      email: badge.email,
      jobTitle: badge.jobTitle,
      categorie: badge.categorie,
      badgeImage: badge.badgeImage,
    },
  });

  const watchAllFields = watch();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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
            <Badge
              firstName={watchAllFields.firstName || 'FIRST NAME'}
              lastName={watchAllFields.lastName || 'LAST NAME'}
              email={watchAllFields.email || 'EMAIL'}
              jobTitle={watchAllFields.jobTitle || 'JOBTITLE'}
              categorie={watchAllFields.categorie || 'CATEGORIE'}
              badgeImage={watchAllFields.badgeImage || defaultBackgroundImage}
              eventLogo={eventLogo || defaultImage}
            />
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
