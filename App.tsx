import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Navigation from './src/Navigation/Navigation';
import HomeScreen from './src/Screens/HomeScreen';
import TodoListScreen from './src/Screens/TodoListScreen';

const Stack = createStackNavigator();

export default function App() {
  return <Navigation />;
}
