/**
 * yigitarc
 */

import React, {Component} from 'react';
import Main from './src/view/Main';
import {Router, Stack, Scene} from 'react-native-router-flux';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Stack key="root">
            <Scene key="main" component={Main} />
          </Stack>
        </Router>
      </Provider>
    );
  }
}

export default App;
