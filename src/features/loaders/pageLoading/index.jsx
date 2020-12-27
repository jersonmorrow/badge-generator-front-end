import React from 'react';
import Loader from '../loader';

function PageLoading() {
  return (
    <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center .container.is-max-widescreen">
      <Loader />
    </div>
  );
}

export default PageLoading;
