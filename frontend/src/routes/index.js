import React from 'react';
import { Switch } from 'react-router-dom';
import Route from '~/routes/Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import Products from '~/pages/Products';
import Sales from '~/pages/Sales';
import Cashier from '~/pages/Cashier';
import Tables from '~/pages/Tables';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn}></Route>
      <Route path="/register@123" component={SignUp}></Route>

      <Route path="/dashboard" component={Dashboard} isPrivate></Route>
      <Route path="/produtos" component={Products} isPrivate></Route>
      <Route path="/vendas" component={Sales} isPrivate></Route>
      <Route path="/caixa" component={Cashier} isPrivate></Route>
      <Route path="/mesas" component={Tables} isPrivate></Route>
      <Route path="/profile" component={Profile} isPrivate></Route>

      {/* <Route path="/" component={() => <h1>404</h1>} /> */}
    </Switch>
  );
}
