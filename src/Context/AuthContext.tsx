import * as React from 'react';

const AuthContext = React.createContext<any>(null);

export const useAuthContext = () => {
  const authContextRef = React.useContext(AuthContext);
  if (authContextRef === null) {
    throw new Error('AuthContext cannot be null. Please add provider');
  }
  return authContextRef;
};

export default AuthContext;
