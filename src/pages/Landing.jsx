import React from 'react';
import homeBackground from '../assets/home-image.jpg';
import AuthOptions from '../features/auth/authOptions';

function Landing() {
  return (
    <div>
      <div className="columns is-vcentered">
        <div className="column is-4 is-flex is-justify-content-center">
          <h3 className="title is-3">Start!</h3>
          <AuthOptions />
        </div>
        <div className="column is-8">
          <img src={homeBackground} alt="home-background" />
        </div>
      </div>
    </div>
  );
}

export default Landing;
