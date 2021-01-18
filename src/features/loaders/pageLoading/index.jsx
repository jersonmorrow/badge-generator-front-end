import React from 'react';
import Loader from 'react-loader-spinner';

function PageLoading() {
  return (
    <section className="section">
      <div className="is-flex is-flex-direction-row is-justify-content-center is-align-items-center container mx-9">
        <Loader
          type="Grid"
          color="#00BFFF"
          height={50}
          width={50}
          timeout={3000}
        />
      </div>
    </section>
  );
}

export default PageLoading;
