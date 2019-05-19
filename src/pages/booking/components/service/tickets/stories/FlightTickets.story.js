// import React from 'react';
// import { IntlProvider } from 'react-intl';
// import { storiesOf } from '@storybook/react';
// import centered from '@kadira/react-storybook-decorator-centered';
// import { map, omit, merge } from 'lodash';

// import { Container } from 'semantic-ui-react';
// import FlightTickets from '../FlightTickets';

// import { booking } from '../../stories/fixtures';

// storiesOf('booking/tickets/FlightTickets', module)
//     .addDecorator(story =>
//         <IntlProvider locale="en">
//             {story()}
//         </IntlProvider>,
//     )
//     .addDecorator(story =>
//         <Container>
//             {story()}
//         </Container>,
//     )
//     .addDecorator(centered)
//     .add('one-way tickets', () =>
//         <FlightTickets
//             booking={merge({}, booking, {
//                 flight: {
//                     general: { wayType: 'ONE_WAY' },
//                 },
//             })}
//         />,
//     )
//     .add('round-trip tickets', () => <FlightTickets booking={booking} />)
//     .add('one passengers', () =>
//         <FlightTickets
//             booking={{
//                 ...booking,
//                 passengers: [booking.passengers[0]],
//             }}
//         />,
//     )
//     .add('check-in registration', () =>
//         <FlightTickets
//             booking={{
//                 ...booking,
//                 passengers: map(booking.passengers, passenger =>
//                     omit(passenger, ['checkin']),
//                 ),
//             }}
//         />,
//     )
//     .add('check-in pending', () =>
//         <FlightTickets
//             booking={{
//                 ...booking,
//                 passengers: map(booking.passengers, passenger => ({
//                     ...passenger,
//                     checkin: 'PENDING',
//                 })),
//             }}
//         />,
//     );
