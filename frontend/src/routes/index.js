import React from 'react';
import { Switch } from 'react-router-dom';
import Route from '~/routes/Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import Products from '~/pages/Products';
import Cashier from '~/pages/Cashier';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn}></Route>
      <Route path="/register" component={SignUp}></Route>

      <Route path="/dashboard" component={Dashboard} isPrivate></Route>
      <Route path="/produtos" component={Products} isPrivate></Route>
      <Route path="/caixa" component={Cashier} isPrivate></Route>
      <Route path="/profile" component={Profile} isPrivate></Route>

      {/* <Route path="/" component={() => <h1>404</h1>} /> */}
    </Switch>
  );
}
