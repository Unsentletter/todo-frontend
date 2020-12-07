import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignUpScreen from '../Screens/AuthScreens/SignUpScreen';
import SignInScreen from '../Screens/AuthScreens/SignInScreen';

const AuthStack = createStackNavigator();

export const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerLeft: null,
      }}
    >
      <AuthStack.Screen name='Sign Up' component={SignUpScreen} />
      <AuthStack.Screen name='Sign In' component={SignInScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
