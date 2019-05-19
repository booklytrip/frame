import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import centered from '@kadira/react-storybook-decorator-centered';
import { Container } from 'semantic-ui-react';

import { departureAirport, arrivalAirport } from './fixtures';

import ResultsHeader from '../ResultsHeader.jsx';

storiesOf('flights/ResultsHeader', module)
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
    .add('loading', () =>
        <ResultsHeader
            wayType="ONE_WAY"
            departureAirport={departureAirport}
            arrivalAirport={arrivalAirport}
            departureDate="2016-09-01"
            adults={1}
            children={0}
            infants={0}
            loading
        />,
    )
    .add('one adult, ONE_WAY', () =>
        <ResultsHeader
            wayType="ONE_WAY"
            departureAirport={departureAirport}
            arrivalAirport={arrivalAirport}
            departureDate="2016-09-01"
            adults={1}
            children={0}
            infants={0}
        />,
    )
    .add('one adult, ROUND_TRIP', () =>
        <ResultsHeader
            wayType="ROUND_TRIP"
            departureAirport={departureAirport}
            arrivalAirport={arrivalAirport}
            departureDate="2016-09-01"
            returnDate="2016-09-10"
            adults={1}
            children={0}
            infants={0}
        />,
    )
    .add('all user types, ROUND_TRIP', () =>
        <ResultsHeader
            wayType="ROUND_TRIP"
            departureAirport={departureAirport}
            arrivalAirport={arrivalAirport}
            departureDate="2016-09-01"
            returnDate="2016-09-10"
            adults={1}
            children={1}
            infants={1}
        />,
    );
