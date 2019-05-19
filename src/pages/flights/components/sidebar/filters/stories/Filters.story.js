import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import centered from '@kadira/react-storybook-decorator-centered';

import { ApolloProvider } from '../../../../../../lib/jest/apollo';

import Filters from '../Filters.jsx';

import { oneWayFlight, roundTripFlight, searchQuery } from './fixtures';

storiesOf('flights/sidebar/Filters', module)
    .addDecorator(story =>
        <ApolloProvider>
            {story()}
        </ApolloProvider>,
    )
    .addDecorator(story =>
        <IntlProvider locale="en">
            {story()}
        </IntlProvider>,
    )
    .addDecorator(story =>
        <div style={{ width: '250px' }}>
            {story()}
        </div>,
    )
    .addDecorator(centered)
    .add('loading', () => <Filters loading />)
    .add('with flights', () =>
        <Filters
            loading={false}
            flights={[oneWayFlight, roundTripFlight]}
            rawFlights={[oneWayFlight, roundTripFlight]}
            query={searchQuery}
        />,
    );
