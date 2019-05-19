import React from 'react';

import { ApolloProvider as Provider } from 'react-apollo';
import ApolloClient from 'apollo-client';
const client = new ApolloClient();

export const ApolloProvider = ({ children }) => (
    <Provider client={ client }>
        { children }
    </Provider>
);
