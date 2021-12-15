import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateContact, createContact } from '../api/data/contactData';

const initialState = {
  car_id: '',
  description: '',
  name: '',
  email: false,
  phone: '',

};

export default function Contact({ obj, userId }) {
  const [formInput, setFormInput] = useState(initialState);
  const history = useHistory();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput({
        car_id: obj.car_id,
        firebaseKey: obj.firebaseKey,
        description: obj.description,
        name: obj.name,
        email: obj.email,
        phone: obj.phone,
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
      updateContact(formInput).then(() => {
        resetForm();
        history.push('/');
      });
    } else {
      createContact({ ...formInput, uid: userId }).then(() => {
        resetForm();
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="form-label visually-hidden">userId {userId}</h1>
      <div className="m-3">
        <label htmlFor="car_id">
          Car ID
        </label>
        <input
          type="text"
          className="form-control"
          id="car_id"
          name="car_id"
          placeholder="Enter Car ID"
          value={formInput.make}
          onChange={handleChange}
          required
        />
      </div>
      <div className="m-3">
        <label htmlFor="model">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          placeholder="Enter Description"
          value={formInput.model}
          onChange={handleChange}
          required
        />
      </div>
      <div className="m-3">
        <label htmlFor="year">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Please enter your name"
          value={formInput.year}
          onChange={handleChange}
          required
        />
      </div>
      <div className="m-3">
        <label htmlFor="mileage">
          Email
        </label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          placeholder="Enter Your Email"
          value={formInput.mileage}
          onChange={handleChange}
          required
        />
      </div>
      <div className="m-3">
        <label htmlFor="price">
          Phone
        </label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          placeholder="Enter Your Phone number"
          value={formInput.price}
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

Contact.propTypes = {
  obj: PropTypes.shape({
    car_id: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
  userId: PropTypes.string.isRequired,
};

Contact.defaultProps = {
  obj: {},
};
