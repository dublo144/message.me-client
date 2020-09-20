import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useAuthState } from '../contexts/AuthContext';
import { ChannelProvider } from '../contexts/ChannelContext';
import Header from '../components/header/Header';
import Channel from '../containers/channel/Channel';
import Sidebar from '../components/sidebar/Sidebar';
import LogIn from '../containers/auth/login/LogIn';
import ProtectedRoute from '../components/routes/ProtectedRoute';

const Routes = () => {
  const { isLoggedIn } = useAuthState();
  return (
    <div className='app'>
      <Router>
        <Switch>
          <Route path={'/login'}>
            {isLoggedIn ? <Redirect to={'/'} /> : <LogIn />}
            <LogIn />
          </Route>
          {isLoggedIn ? (
            <ChannelProvider>
              <Header />
              <div className='app__body'>
                <Sidebar />
                <ProtectedRoute path={'/channel/:channelId'}>
                  <Channel />
                </ProtectedRoute>
              </div>
            </ChannelProvider>
          ) : (
            <Redirect to={'/login'} />
          )}
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
