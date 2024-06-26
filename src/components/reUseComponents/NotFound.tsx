// src/components/pages/NotFound/NotFound.js

import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default NotFound;
