import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'reactstrap';
import { signInUser } from '../api/auth';

export default function SignIn({ user }) {
  return (
    <>
      {user === null ? (
        <div className="text-center">
          <Spinner
            style={{ width: '10rem', height: '10rem' }}
            color="warning"
          />
        </div>
      ) : (
        <div className="sign-in mt-5" align="center">
          <p>
            <button
              type="button"
              className="btn btn-success"
              onClick={signInUser}
            >
              Sign In
            </button>
          </p>
          <img className="vadana" alt="profileImage" src="img/vadana-autos.jpg" />
        </div>
      )}
    </>
  );
}

SignIn.propTypes = {
  user: PropTypes.node,
};

SignIn.defaultProps = {
  user: null,
};
