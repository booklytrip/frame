import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import centered from '@kadira/react-storybook-decorator-centered';

import {
    oneWayFlight,
    roundTripFlight,
} from '../../../../flights/components/flightslist/stories/fixtures';

import { Container } from 'semantic-ui-react';
import FlightInformation from '../FlightInformation.jsx';

storiesOf('booking/details/FlightInformation', module)
    .addDecorator(story =>
        <IntlProvider locale="en">
            {story()}
        </IntlProvider>,
    )
    .addDecorator(story =>
        <Container>
            {story()}
        </Container>,
    )
    .addDecorator(centered)
    .add('one-way flight', () => <FlightInformation flight={oneWayFlight} />)
    .add('round-trip flight', () =>
        <FlightInformation flight={roundTripFlight} />,
    );
