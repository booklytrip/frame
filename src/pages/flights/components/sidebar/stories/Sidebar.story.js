import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import centered from '@kadira/react-storybook-decorator-centered';

import { ApolloProvider } from '../../../../../lib/jest/apollo';

import Sidebar from '../Sidebar.jsx';

import { oneWayFlight } from '../../flightslist/stories/fixtures';

storiesOf('flights/Sidebar', module)
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
    .add('default', () =>
        <Sidebar
            loading={false}
            flights={[oneWayFlight]}
            rawFlights={[oneWayFlight]}
        />,
    );
