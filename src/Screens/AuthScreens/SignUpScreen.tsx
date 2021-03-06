import * as React from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../Context/AuthContext';

export const SignUpScreen = () => {
  const authContext = useAuthContext();
  const navigation = useNavigation();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [name, setName] = React.useState<string>();

  const onChange = (text: string, input: string) => {
    if (input === 'email') {
      setEmail(text);
    }
    if (input === 'password') {
      setPassword(text);
    }
    if (input === 'name') {
      setName(text);
    }
  };

  const signup = () => {
    authContext.signUp({ email, password, name });
  };

  return (
    <View>
      <TextInput
        label='email'
        value={email}
        onChangeText={(text) => onChange(text, 'email')}
        keyboardType='email-address'
      />
      <TextInput
        label='Password'
        value={password}
        onChangeText={(text) => onChange(text, 'password')}
        secureTextEntry
      />
      <TextInput
        label='Name'
        value={name}
        onChangeText={(text) => onChange(text, 'name')}
      />
      <Button mode={'contained'} onPress={signup}>
        SUBMIT
      </Button>
      <Button onPress={() => navigation.navigate('Sign In')}>Sign in</Button>
    </View>
  );
};

export default SignUpScreen;
