import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './Screens/HomeScreen';
import TodoListScreen from './Screens/TodoListScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Locations" component={HomeScreen} />
        <Stack.Screen name="Todos" component={TodoListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
