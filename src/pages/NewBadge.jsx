import React, { useEffect, useState } from 'react';
import BadgeForm from '../features/badges/badgeForm';
import Badge from '../features/badges/badge';
import { useForm } from 'react-hook-form';
import api from '../api/api.js';
import { useHistory } from 'react-router-dom';
import PageLoading from '../features/loaders/pageLoading';

function NewBadge(props) {
  const { register, handleSubmit, errors, watch, formState } = useForm();
  const { eventId } = props.match.params;

  const [badgeImage, setBadgeImage] = useState(
    'https://i.pinimg.com/originals/56/d8/44/56d844bff35317eda6a42544f71ecd4c.jpg'
  );

  const [eventLogo, setEventLogo] = useState(
    'https://icon-library.com/images/logo-icon-png/logo-icon-png-25.jpg'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const watchAllFields = watch();

  useEffect(() => {
    const fetchLogo = async () => {
      const response = await api.events.read(props.match.params.eventId);
      const eventLogo = response.eventImage;
      setEventLogo(eventLogo);
    };

    fetchLogo();
  }, []);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.badges.create(data, eventId);
      setLoading(false);

      history.push(`/${eventId}/badges`);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="section">
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
              badgeImage={watchAllFields.badgeImage || badgeImage}
              eventLogo={eventLogo}
            />
          </div>
          <div className="column is-two-fifths">
            <h3 className="title is-3">New Badge</h3>
            <BadgeForm
              onSubmit={handleSubmit(onSubmit)}
              register={register}
              errors={errors}
              formState={formState}
            />
          </div>
          <div className="column"></div>
        </div>
      </div>
    </div>
  );
}

export default NewBadge;
