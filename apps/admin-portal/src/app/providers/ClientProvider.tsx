'use client';

import { Provider } from 'react-redux';
import { store } from '../../redux/store';

export const ClientProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => <Provider store={store}>{children}</Provider>;
