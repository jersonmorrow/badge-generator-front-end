import React, { useState } from 'react';
import BadgeForm from '../features/events/badgeForm';
import { useForm } from 'react-hook-form';
import api from '../api/api.js';
import { useHistory } from 'react-router-dom';
import PageLoading from '../features/loaders/pageLoading';

function NewBadge() {
  const { register, handleSubmit, control, errors, formState } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const history = useHistory();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { name, lastName, email, jobTitle, categorie, badgeImage } = data;

    const payload = new FormData();
    payload.append('name', name);
    payload.append('lastName', lastName);
    payload.append('email', email);
    payload.append('jobTitle', jobTitle);
    payload.append('categorie', categorie);
    payload.append('badgeImage', badgeImage);

    try {
      await api.badges.create(payload);
      setLoading(false);

      history.push('/badges');
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
    <React.Fragment>
      <div className="container is-flex is-justify-content-center mx-6">
        <div classNam="column">
          <div className="my-6">
            <Badge
              name={'FIRST NAME'}
              lastName={'LAST NAME'}
              email={'EMAIL'}
              jobTitle={'JOBTITLE'}
              categorie={'CATEGORIE'}
            />
          </div>
          <div>
            <h1>New Badge</h1>
            <BadgeForm
              onSubmit={handleSubmit(onSubmit)}
              register={register}
              errors={errors}
              formState={formState}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NewBadge;
