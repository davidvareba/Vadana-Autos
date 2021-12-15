import React from 'react';
import { useParams } from 'react-router';
import CarDetail from '../components/CarDetail';

export default function Detail() {
  const { firebaseKey } = useParams();
  return (
    <>
      <h1 className="form-label visually-hidden">user id {firebaseKey}</h1>
      <CarDetail uid={firebaseKey} />
    </>
  );
}
