import * as React from 'react';
import { Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useAuthContext } from '../../Context/AuthContext';

export const SignUpScreen = () => {
  const authContext = useAuthContext();
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
      <Text>Sign up screen</Text>
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
      <Button onPress={signup}>SUBMIT</Button>
    </View>
  );
};

export default SignUpScreen;
