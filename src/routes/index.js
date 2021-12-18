import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import New from '../views/New';
import All from '../views/All';
import Detail from '../views/Detail';
import Edit from '../views/Edit';
import NewCars from '../views/NewCars';
import UsedCars from '../views/UsedCars';
import FavoriteCars from '../views/FavoriteCars';
import Contact from '../views/Contact';

export default function Routes({ userId }) {
  return (
    <div>
      <Switch>
        console.warn({userId});
        <Route exact path="/home" component={Home} />
        <Route exact path="/post" component={() => <New userId={userId} />} />
        <Route exact path="/newCars" component={() => <NewCars userId={userId} />} />
        <Route exact path="/usedCars" component={() => <UsedCars userId={userId} />} />
        <Route exact path="/contact" component={() => <Contact userId={userId} />} />
        <Route exact path="/detail/:firebaseKey" component={Detail} />
        <Route
          exact
          path="/edit/:firebaseKey"
          component={() => <Edit userId={userId} />}
        />
        <Route
          exact
          path="/all"
          component={() => <All userId={userId} />}
        />
        <Route
          exact
          path="/favoriteCars"
          component={() => <FavoriteCars userId={userId} />}
        />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  userId: PropTypes.string,
};

Routes.defaultProps = { userId: {} };
