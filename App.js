import React from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './components/home';
import Camera from './components/camera';

const AppNavigator = createStackNavigator({
  Home: {screen: Home},
  Camera: {screen: Camera},
}, 
{
  initialRoute: 'Home',
  headerMode: 'none',
});

const App = createAppContainer(AppNavigator);

export default function() {
  return (
    <App navigation={AppNavigator}/>
    
  )
}