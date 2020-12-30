import React from 'react';
import homeBackground from '../assets/home-image.jpg';

function Home() {
  return (
    <div>
      <div className="columns is-vcentered">
        <div className="column is-4"></div>
        <div className="column is-8">
          <img src={homeBackground} alt="home-background" />
        </div>
      </div>
    </div>
  );
}

export default Home;
