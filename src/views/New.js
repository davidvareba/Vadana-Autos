import React from 'react';
import PropTypes from 'prop-types';
import ItemForm from '../components/SellCarForm';

export default function New({ userId }) {
  return (
    <>
      <h1 className="text-center">Contact</h1>
      <ItemForm userId={userId} />
    </>
  );
}

New.propTypes = {
  userId: PropTypes.string,
};

New.defaultProps = { userId: {} };
