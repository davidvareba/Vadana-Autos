import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateItem, createItem } from '../api/data/carData';

const initialState = {
  make: '',
  model: '',
  price: '',
  new: false,
  year: '',
  car_id: '',
  uid: '',
  imageUrl: '',
  favorite: false,
  mileage: '',
  zip: '',
};

export default function CarForm({ obj, userId }) {
  const [formInput, setFormInput] = useState(initialState);
  const history = useHistory();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput({
        make: obj.make,
        firebaseKey: obj.firebaseKey,
        model: obj.model,
        imageUrl: obj.imageUrl,
        uid: obj.uid,
        favorite: obj.favorite,
        new: obj.new,
        year: obj.year,
        price: obj.price,
        mileage: obj.mileage,
        zip: obj.zip,
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
      updateItem(formInput).then(() => {
        resetForm();
        history.push('/');
      });
    } else {
      createItem({ ...formInput, uid: userId }).then(() => {
        resetForm();
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="form-label visually-hidden">userId {userId}</h1>
      <div className="m-3">
        <label htmlFor="make">
          Make
        </label>
        <input
          type="text"
          className="form-control"
          id="make"
          name="make"
          placeholder="Enter Car Make"
          value={formInput.make}
          onChange={handleChange}
          required
        />
      </div>
      <div className="m-3">
        <label htmlFor="model">
          Model
        </label>
        <input
          type="text"
          className="form-control"
          id="model"
          name="model"
          placeholder="Enter Car Model"
          value={formInput.model}
          onChange={handleChange}
          required
        />
      </div>
      <div className="m-3">
        <label htmlFor="year">
          Year
        </label>
        <input
          type="text"
          className="form-control"
          id="year"
          name="year"
          placeholder="Enter Car Year"
          value={formInput.year}
          onChange={handleChange}
          required
        />
      </div>
      <div className="m-3">
        <label htmlFor="mileage">
          Mileage
        </label>
        <input
          type="text"
          className="form-control"
          id="mileage"
          name="mileage"
          placeholder="Enter Car Mileage"
          value={formInput.mileage}
          onChange={handleChange}
          required
        />
      </div>
      <div className="m-3">
        <label htmlFor="price">
          Price
        </label>
        <input
          type="text"
          className="form-control"
          id="price"
          name="price"
          placeholder="Enter Car Price"
          value={formInput.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="m-3">
        <label htmlFor="car_id">
          Car ID
        </label>
        <input
          type="text"
          className="form-control"
          id="car_id"
          name="car_id"
          placeholder="Enter Car Identification Number"
          value={formInput.car_id}
          onChange={handleChange}
          required
        />
      </div>
      <div className="m-3">
        <label htmlFor="zip">
          Zip Code
        </label>
        <input
          type="text"
          className="form-control"
          id="zip"
          name="zip"
          placeholder="Please Enter Your Zip Code"
          value={formInput.zip}
          onChange={handleChange}
          required
        />
      </div>
      <div className="m-3">
        <label htmlFor="cars">Car Type  </label><br />

        <select name="cars" id="cars">
          <option value="blank"> </option>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
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
        <button type="submit" className="btn btn-success">
          {obj.firebaseKey ? 'Update' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

CarForm.propTypes = {
  obj: PropTypes.shape({
    make: PropTypes.string,
    model: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    imageUrl: PropTypes.string,
    favorite: PropTypes.bool,
    new: PropTypes.bool,
    price: PropTypes.string,
    car_id: PropTypes.string,
    year: PropTypes.string,
    mileage: PropTypes.string,
    zip: PropTypes.string,
  }),
  userId: PropTypes.string.isRequired,
};

CarForm.defaultProps = {
  obj: {},
};
