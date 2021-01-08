import React from 'react';

function Badge(props) {
  const { name, lastName, email, jobTitle, categorie } = props;

  return (
    <div className="box">
      <h3 className="title is-3">{name}</h3>
      <p>{lastName}</p>
      <p>{email}</p>
      <p>{jobTitle}</p>
      <p>{categorie}</p>
    </div>
  );
}

export default Badge;
