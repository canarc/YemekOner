/**
 * yigitarc
 */

import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

//Screens
import TabRouter from './src/view/TabRouter';
import Login from './src/view/Login';
import Home from './src/view/Home';
import FirstLogin from './src/view/FirstLogin';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Stack key="root">
            <Scene key="loginScreen" hideNavBar component={Login} />
            <Scene key="firstLoginScreen" hideNavBar component={FirstLogin} />
            <Scene key="tabRouter" hideNavBar component={TabRouter} />
            <Scene key="homeScreen" hideNavBar component={Home} />
          </Stack>
        </Router>
      </Provider>
    );
  }
}

export default App;
