/**
 * Initialize apollo provider and return configuration free
 * provider that is ready to be used.
 */
import React from 'react';
import { ApolloProvider as BaseApolloProvider } from 'react-apollo';
import client from '../apollo-client';
import store from '../store';

const ApolloProvider = ({ children }) => (
    <BaseApolloProvider client={client} store={store}>
        {children}
    </BaseApolloProvider>
);

export default ApolloProvider;
