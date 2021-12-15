import React from 'react';
import PropTypes from 'prop-types';
import CarForm from '../components/CarForm';

export default function New({ userId }) {
  return (
    <>
      <h1 className="text-center">Post Your Car For Sale!</h1>
      <CarForm userId={userId} />
    </>
  );
}

New.propTypes = {
  userId: PropTypes.string,
};

New.defaultProps = { userId: {} };
