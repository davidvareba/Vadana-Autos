import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateCar, createCar } from '../api/data/carData';

const initialState = {
  name: '',
  description: '',
  uid: '',
  imageUrl: '',
  favorite: false,
};

export default function ItemForm({ obj, userId }) {
  const [formInput, setFormInput] = useState(initialState);
  const history = useHistory();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput({
        name: obj.name,
        firebaseKey: obj.firebaseKey,
        description: obj.description,
        imageUrl: obj.imageUrl,
        uid: obj.uid,
        favorite: obj.favorite,
      });
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormInput(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      // update the item
      updateCar(formInput).then(() => {
        resetForm();
        history.push('/');
      });
    } else {
      createCar({ ...formInput, uid: userId }).then(() => {
        resetForm();
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="form-label visually-hidden">userId {userId}</h1>
      <div className="m-3">
        <label htmlFor="name">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Enter Item Name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="m-3">
        <label htmlFor="imageUrl">
          Image
        </label>
        <input
          className="form-control"
          type="url"
          id="imageUrl"
          rows="3"
          name="imageUrl"
          placeholder="Enter Item URL"
          value={formInput.imageUrl}
          onChange={handleChange}
          required
        />
      </div>
      <div className="m-3">
        <label htmlFor="description">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          name="description"
          placeholder="Enter Description..."
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="m-3">
        <button type="submit" className="btn btn-success">
          {obj.firebaseKey ? 'Update' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

ItemForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    imageUrl: PropTypes.string,
    favorite: PropTypes.bool,
  }),
  userId: PropTypes.string.isRequired,
};

ItemForm.defaultProps = {
  obj: {},
};
