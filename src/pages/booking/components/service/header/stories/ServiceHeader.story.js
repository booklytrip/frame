import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import centered from '@kadira/react-storybook-decorator-centered';
import { omit, map } from 'lodash';

import { Container } from 'semantic-ui-react';
import ServiceHeader from '../ServiceHeader';

import { booking } from './fixtures';

storiesOf('booking/header/ServiceHeader', module)
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
    .add('payment options', () =>
        <ServiceHeader booking={omit(booking, ['payment'])} />,
    )
    .add('payment pending', () =>
        <ServiceHeader
            booking={{
                ...booking,
                payment: {
                    ...booking.payment,
                    status: 'pending',
                },
            }}
        />,
    )
    .add('payment failed', () =>
        <ServiceHeader
            booking={{
                ...booking,
                payment: {
                    ...booking.payment,
                    status: 'failed',
                },
            }}
        />,
    )
    .add('check-in registration', () => <ServiceHeader booking={booking} />)
    .add('check-in pending', () =>
        <ServiceHeader
            booking={{
                ...booking,
                passengers: map(booking.passengers, passenger => ({
                    ...passenger,
                    checkin: 'PENDING',
                })),
            }}
        />,
    )
    .add('confirmation', () =>
        <ServiceHeader
            booking={{
                ...booking,
                passengers: map(booking.passengers, passenger => ({
                    ...passenger,
                    checkin: 'CONFIRMED',
                })),
            }}
        />,
    );
