import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../Screens/HomeScreen';
import TodoListScreen from '../Screens/TodoListScreen';

const AppStack = createStackNavigator();

export const AppStackScreen = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name='Home' component={HomeScreen} />
      <AppStack.Screen name='TodoList' component={TodoListScreen} />
    </AppStack.Navigator>
  );
};

export default AppStackScreen;
