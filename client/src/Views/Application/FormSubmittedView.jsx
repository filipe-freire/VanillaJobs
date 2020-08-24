import React from 'react';
import { Link } from 'react-router-dom';

const FormSubmittedView = () => {
  return (
    <div>
      <h1>Application Submitted Successfully!</h1>
      <h3>Thank you for applying through Vanilla Jobs!</h3>
      <p>Please "await" while we "async" your information to the company!</p>
      <Link to="/">Back to Homepage</Link>
    </div>
  );
};

export default FormSubmittedView;
