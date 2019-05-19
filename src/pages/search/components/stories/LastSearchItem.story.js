import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@kadira/react-storybook-decorator-centered';

import { oneWaySearchQuery } from './fixtures';

import LastSearchItem from '../LastSearchItem.jsx';

storiesOf('search/LastSearchItem', module)
    .addDecorator(centered)
    .add('default', () =>
        <LastSearchItem
            departureAirport={oneWaySearchQuery.departureAirport}
            arrivalAirport={oneWaySearchQuery.arrivalAirport}
        />,
    )
    .add('loading', () =>
        <LastSearchItem
            departureAirport={oneWaySearchQuery.departureAirport}
            arrivalAirport={oneWaySearchQuery.arrivalAirport}
            loading
        />,
    );
