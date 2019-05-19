import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import centered from '@kadira/react-storybook-decorator-centered';

import {
    oneWayFlight,
    roundTripFlight,
    fewerSeatsFlight,
} from '../../../../flights/components/flightslist/stories/fixtures';

import { passengers } from './fixtures';

import Summary from '../Summary.jsx';

storiesOf('booking/Summary', module)
    .addDecorator(story =>
        <IntlProvider locale="en">
            {story()}
        </IntlProvider>,
    )
    .addDecorator(story =>
        <div style={{ width: '300px' }}>
            {story()}
        </div>,
    )
    .addDecorator(centered)
    .add('one-way flight', () => <Summary flight={oneWayFlight} />)
    .add('round-trip flight', () => <Summary flight={roundTripFlight} />)
    .add('with passengers', () =>
        <Summary flight={roundTripFlight} passengers={passengers} />,
    )
    .add('with few seats', () =>
        <Summary flight={fewerSeatsFlight} passengers={passengers} />,
    );
