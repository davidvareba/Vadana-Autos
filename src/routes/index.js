import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import New from '../views/New';
import AllCars from '../views/AllCars';

export default function Routes({ userId }) {
  return (
    <div>
      <Switch>
        console.warn({userId});
        <Route exact path="/home" component={Home} />
        <Route exact path="/new" component={() => <New userId={userId} />} />
        <Route
          exact
          path="/all"
          component={() => <AllCars userId={userId} />}
        />

      </Switch>
    </div>
  );
}

Routes.propTypes = {
  userId: PropTypes.string,
};

Routes.defaultProps = { userId: {} };
