import React from 'react';
import { Link } from 'react-router-dom-v6';

const NotFound: React.FC = () => {
  return (
    <>
      NotFound
      <br />
      <Link to='layouts'>GoLayout</Link>
    </>
  );
};
export default NotFound;
