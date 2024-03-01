'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import SignUp from './SignUp';

export const SignUpPage: React.FC = () => {
  return (
    <Provider store={store}>
      <SignUp />
    </Provider>
  );
};

export default SignUpPage;
