/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store';
import AppNavigation from './src/navigation/AppNavigation';

function App(): JSX.Element {

  return (
    <Provider store={store}>
      <View style={style.container}>
        <AppNavigation />
      </View>
    </Provider>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
