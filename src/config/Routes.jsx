import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useAuthState } from '../contexts/AuthContext';
import SignIn from '../containers/auth/signIn/SignIn';
import SignUp from '../containers/auth/signUp/SignUp';
import { ChannelProvider } from '../contexts/ChannelContext';
import Header from '../components/header/Header';
import Channel from '../containers/channelAlt/Channel';
import Sidebar from '../components/sidebar/Sidebar';

const Routes = () => {
  const { isLoggedIn } = useAuthState();
  return (
    <div className='app'>
      <Router>
        <ChannelProvider>
          <Header />
          <div className='app__body'>
            <Sidebar />
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
              <Route path={'/channel/:channelId'}>
                <Channel />
              </Route>
            </Switch>
          </div>
        </ChannelProvider>
      </Router>
    </div>
  );
};

export default Routes;
