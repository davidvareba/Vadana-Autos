import React, { useState } from 'react';
import { CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteCar, updateCar } from '../api/data/carData';

export default function Card({ card, setCards }) {
  const [checked, setChecked] = useState();

  const handleChange = () => {
    setChecked(!checked);
    const favcard = {
      firebaseKey: card.firebaseKey,
      description: card.description,
      imageUrl: card.imageUrl,
      uid: card.uid,
      favorite: !card.favorite,
    };
    updateCar(favcard).then(setCards);
  };

  const handleClick = (method) => {
    if (method === 'delete') {
      deleteCar(card).then(setCards);
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
          <h6 className="card-title">{card.name}</h6>
          <hr />
          <p className="card-text">{card.description}</p>
          <label>
            <input
              id="heart"
              type="checkbox"
              checked={card.favorite ? 'checked' : ''}
              onChange={handleChange}
            />
            Like this project?
          </label>
        </div>
        <Link to={`/edit/${card.firebaseKey}`} className="btn btn-warning">
          Edit Project
        </Link>
        <Link to={`/detail/${card.firebaseKey}`} className="btn btn-info">
          View Project Details
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
