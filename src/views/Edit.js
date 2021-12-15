import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import CarForm from '../components/CarForm';
import { getItemsFB } from '../api/data/carData';

export default function Edit({ userId }) {
  const [editItem, setEditItem] = useState({});
  const { firebaseKey } = useParams();

  useEffect(() => {
    getItemsFB(firebaseKey).then(setEditItem);
  }, []);

  return (
    <div>
      <CarForm obj={editItem} userId={userId} />
    </div>
  );
}

Edit.propTypes = {
  userId: PropTypes.string,
};

Edit.defaultProps = { userId: {} };
