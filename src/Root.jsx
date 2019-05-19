import React from 'react';
import Raven from 'raven-js';
import { ApolloProvider, IntlProvider, ProjectProvider } from './providers';

import { App } from './layouts';
import config from './config';

// Init sentry error tracker
Raven.config(
    config.sentry.url,
    Object.assign({}, config.sentry, {
        environment: process.env.NODE_ENV,
    }),
).install();

const Root = () =>
    <ApolloProvider>
        <IntlProvider>
            <ProjectProvider>
                <App />
            </ProjectProvider>
        </IntlProvider>
    </ApolloProvider>;

export default Root;
