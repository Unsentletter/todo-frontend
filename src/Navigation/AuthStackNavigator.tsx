import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignUpScreen from '../Screens/AuthScreens/SignUpScreen';

const AuthStack = createStackNavigator();

export const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name='SignUp' component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
