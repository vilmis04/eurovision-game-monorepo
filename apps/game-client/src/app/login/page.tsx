'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Login from './Login';

export const LoginPage: React.FC = () => {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
};

export default LoginPage;
