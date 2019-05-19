/**
 * @flow
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { map } from 'lodash';

import { Header, Segment, Grid } from 'semantic-ui-react';

import PassengerItem from './PassengerItem.jsx';

import type { Booking } from '../../../../../types';

type FlightTicketsProps = {
    booking: Booking,
};

const GridColumn = styled(Grid.Column)`
    margin: 0 !important;
`;

/**
 * Component represents list of passengers and link to tickets
 */
const FlightTickets = ({ booking }: FlightTicketsProps) =>
    <Segment.Group>
        <Segment attached>
            <Grid divided="vertically" columns={2}>
                <Grid.Row columns={1}>
                    <GridColumn textAlign="middle">
                        <Header as="h2">
                            <FormattedMessage
                                id="booking.service.tickets.FlightTickets.header"
                                defaultMessage="Passengers"
                            />
                        </Header>
                    </GridColumn>
                </Grid.Row>
                {map(booking.passengers, (passenger, idx) =>
                    <PassengerItem
                        key={idx}
                        booking={booking}
                        passenger={passenger}
                    />,
                )}
            </Grid>
        </Segment>
    </Segment.Group>;

export default FlightTickets;
