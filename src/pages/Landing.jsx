import React from 'react';
import homeBackground from '../assets/home-image.jpg';
import AuthOptions from '../features/auth/authOptions';
import logo from '../assets/logo.png';

function Landing() {
  return (
    <div>
      <div className="columns">
        <div className="column is-two-fifths">
          <img src={homeBackground} alt="home-background" />
        </div>
        <div className="column is-flex-direction-column is-flex is-justify-content-center is-align-items-center">
          <div className="has-text-centered">
            <img src={logo} alt="logo" />
          </div>
          <div>
            <p className="title is-3">
              Store your badges and events in one place!{' '}
            </p>
            <p className="title is-5">Start Today!</p>
            <AuthOptions />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
