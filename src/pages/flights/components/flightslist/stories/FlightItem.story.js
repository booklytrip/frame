import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import centered from '@kadira/react-storybook-decorator-centered';

import { oneWayFlight, roundTripFlight, fewerSeatsFlight } from './fixtures';

import { Container } from 'semantic-ui-react';
import FlightItem from '../FlightItem.jsx';

storiesOf('flights/FlightItem')
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
    .add('one-way flight', () => <FlightItem flight={oneWayFlight} />)
    .add('round-trip flight', () => <FlightItem flight={roundTripFlight} />)
    .add('fewer seats left', () => <FlightItem flight={fewerSeatsFlight} />);
