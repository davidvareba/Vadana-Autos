import React, { useState } from 'react';
import { CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteItem, updateItem } from '../api/data/carData';

export default function Card({ card, setCards }) {
  const [checked, setChecked] = useState();

  const handleChange = (event) => {
    setChecked(!checked);
    const favcard = {
      firebaseKey: card.firebaseKey,
      make: card.make,
      model: card.model,
      year: card.year,
      mileage: card.mileage,
      price: card.price,
      imageUrl: card.imageUrl,
      uid: card.uid,
      new: card.new,
      favorite: event.target.checked,
    };
    updateItem(favcard).then(setCards);
  };

  const handleClick = (method) => {
    if (method === 'delete') {
      deleteItem(card).then(setCards);
    }
  };

  return (
    <div>
      <div className="card" style={{ width: '18rem', margin: '3px' }}>
        <CardImg
          alt="Card image"
          src={card.imageUrl}
        />
        <div className="card-body">
          <h6 className="card-title">Make: {card.make}</h6>
          <hr />
          <p className="card-text">Model: {card.model}</p>
          <p className="card-text">Year: {card.year}</p>
          <p className="card-text">Price: {card.price}</p>
          <p className="card-text">Mileage: {card.mileage}</p>
          <label>
            <input
              type="checkbox"
              checked={card.favorite ? 'checked' : ''}
              onChange={handleChange}
            />
            Like this Car?
          </label>
        </div>
        <Link to={`/edit/${card.firebaseKey}`} className="btn btn-warning">
          Edit Car
        </Link>
        <Link to={`/detail/${card.firebaseKey}`} className="btn btn-info">
          View Car Details
        </Link>
        <button
          onClick={() => handleClick('delete')}
          className="btn btn-danger"
          type="button"
        >
          DELETE
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.shape(PropTypes.obj).isRequired,
  setCards: PropTypes.func.isRequired,
};
