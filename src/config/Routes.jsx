import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from '../components/routes/ProtectedRoute';
import { useAuthState } from '../contexts/AuthContext';
import SignIn from '../containers/auth/signIn/SignIn';
import SignUp from '../containers/auth/signUp/SignUp';
import Channels from '../containers/channel/Channels';
import { ChannelProvider } from '../contexts/ChannelContext';

const Routes = () => {
  const { isLoggedIn } = useAuthState();
  return (
    <Switch>
      <Route exact path='/'>
        {isLoggedIn ? (
          <Redirect to={'/channels'} />
        ) : (
          <Redirect to={'/signIn'} />
        )}
      </Route>
      <Route path={'/signIn'}>
        {isLoggedIn ? <Redirect to={'/channels'} /> : <SignIn />}
      </Route>
      <Route path={'/signUp'}>
        {isLoggedIn ? <Redirect to={'/channels'} /> : <SignUp />}
      </Route>
      <ProtectedRoute path='/channels'>
        <ChannelProvider>
          <Channels />
        </ChannelProvider>
      </ProtectedRoute>
    </Switch>
  );
};

export default Routes;
