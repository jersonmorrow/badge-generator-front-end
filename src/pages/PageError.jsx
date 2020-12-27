import React from 'react';

function PageError(props) {
  return <div className="PageError">{props.error.message}⚠</div>;
}

export default PageError;
