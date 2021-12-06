import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import New from '../views/New';

export default function Routes({ userId }) {
  return (
    <div>
      <Switch>
        console.warn({userId});
        <Route exact path="/home" component={Home} />
        <Route exact path="/new" component={() => <New userId={userId} />} />

      </Switch>
    </div>
  );
}

Routes.propTypes = {
  userId: PropTypes.string,
};

Routes.defaultProps = { userId: {} };
