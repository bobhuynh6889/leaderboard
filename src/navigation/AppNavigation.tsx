import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './index';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Routes from './Routes';

//screen
import Home from '../views/Home';
import Splash from '../views/Splash';

export default function AppNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={Routes.SPLASH}>
        <Stack.Screen name={Routes.SPLASH} component={Splash} />
        <Stack.Screen name={Routes.HOME} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();
