import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import { getFavCars } from '../api/data/carData';

export default function All({ userId }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getFavCars(userId).then((cardsArray) => {
      if (isMounted) setCards(cardsArray);
    });
    return () => {
      isMounted = false;
    }; // cleanup function
  }, []);

  return (
    <div className="container">
      {cards ? (
        <>
          <h1 className="text-center">Favorite Cars</h1>
          <div className="d-flex flex-wrap">
            {cards.map((card) => (
              <Card key={card.firebaseKey} card={card} setCards={setCards} />
            ))}
          </div>
        </>
      ) : (
        'Add a card'
      )}
    </div>
  );
}

All.propTypes = {
  userId: PropTypes.string.isRequired,
};
