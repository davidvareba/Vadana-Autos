import React from 'react';
import PropTypes from 'prop-types';
import SellForm from '../components/SellForm';

export default function New({ userId }) {
  return (
    <>
      <h1 className="text-center">Contact</h1>
      <SellForm userId={userId} />
    </>
  );
}

New.propTypes = {
  userId: PropTypes.string,
};

New.defaultProps = { userId: {} };
