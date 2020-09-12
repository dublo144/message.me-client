import React from 'react';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const AltUi = () => {
  return (
    <div className={'app'}>
      <Router>
        <Header />
        <div className='app__body'>
          <Sidebar />
          <Switch>
            <Route path={'channel/:channelId'}></Route>
            <Route exact path={'/'}>
              <h1>Welcome</h1>
            </Route>
          </Switch>
          {/* Chat screen */}
        </div>
      </Router>
    </div>
  );
};

export default AltUi;
