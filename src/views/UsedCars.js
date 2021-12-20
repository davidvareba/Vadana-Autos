import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import { getItems } from '../api/data/carData';

export default function UsedCars({ userId }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getItems(userId).then((cardsArray) => {
      console.warn(cardsArray);
      if (isMounted) setCards(cardsArray.filter((obj) => obj.new === !true));
    });
    return () => {
      isMounted = false;
    }; // cleanup function
  }, []);

  return (
    <div className="container">
      {cards ? (
        <>
          <h1 className="text-center">Used Cars</h1>
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

UsedCars.propTypes = {
  userId: PropTypes.string.isRequired,
};
