/**
 * Redux provider with defined store
 *
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';

const ReduxProvider = ({ children }: { children: any }) => (
    <Provider store={store}>
        {children}
    </Provider>
);

export default ReduxProvider;
