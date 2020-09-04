import React from 'react';
import { getUserinfo } from '../helpers/JwtTokenParser';

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

const initialState = {
  jwtToken: '',
  userId: '',
  username: '',
  isLoggedIn: false,
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN': {
      return signIn(state, action);
    }
    case 'SIGN_OUT': {
      return signOut();
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
};

const init = (initialState) => {
  const token = localStorage.getItem('jwtToken');

  if (token) {
    const { userId, username } = getUserinfo(token);
    return {
      ...initialState,
      jwtToken: token,
      userId: userId,
      username: username,
      isLoggedIn: true
    };
  }

  return initialState;
};

const signIn = (state, action) => {
  localStorage.setItem('jwtToken', action.payload.token);
  return {
    ...state,
    userId: action.payload.userId,
    username: action.payload.username,
    jwtToken: action.payload.token,
    isLoggedIn: true
  };
};

const signOut = () => {
  localStorage.removeItem('jwtToken');
  return initialState;
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState, init);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useAuthState = () => {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return context;
};

const useAuthDispatch = () => {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuthState, useAuthDispatch, signIn };
