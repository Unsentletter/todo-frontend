import * as React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthContext from '../Context/AuthContext';

import AuthStackScreen from './AuthStackNavigator';
import AppStackScreen from './AppStackNavigator';
import API from '../API/api';

export const Navigation = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('accessToken');
      } catch (err) {
        return setIsLoading(false);
      }
      dispatch({ type: 'RESTORE_TOKEN', token });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        const user = await API('post', 'user/signin', data);

        // TODO - Need to work out how I am going to handle user data
        // I think context
        // TODO - How will I handle errors?

        await AsyncStorage.setItem('accessToken', user.data.data.token);
        dispatch({ type: 'SIGN_IN', token: user.data.data.token });
        return;
      },
      signOut: async () => {
        await AsyncStorage.removeItem('accessToken');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        const user = await API('post', 'user/signup', data);

        // TODO - Need to work out how I am going to handle user data
        // I think context
        // TODO - How will I handle errors?

        await AsyncStorage.setItem('accessToken', user.data.data.token);
        dispatch({ type: 'SIGN_IN', token: user.data.data.token });
      },
    }),
    []
  );

  const navigationOptions = () => {
    if (isLoading) return <Text>Loading</Text>;

    return !state.userToken ? <AuthStackScreen /> : <AppStackScreen />;
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>{navigationOptions()}</NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Navigation;
