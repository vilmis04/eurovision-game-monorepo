'use client';

import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { Dashboard } from './Dashboard';

export default function Index() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}
