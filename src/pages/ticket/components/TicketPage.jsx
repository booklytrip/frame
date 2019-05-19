/**
 * @flow
 */

import React from 'react';
import styled from 'styled-components';
import { compose, branch, renderComponent } from 'recompose';
import {
    Segment,
    Header,
    List,
    Popup,
    Icon,
    Loader,
    Container,
} from 'semantic-ui-react';
import { get, map } from 'lodash';
import BaseFlightDetails from '../../flights/components/flightslist/FlightDetails';

import type { Booking } from '../../../types';

type FlightTicketProps = {
    booking: Booking,
};

const FlightDetails = styled(BaseFlightDetails)`
    padding-left: 1em !important;
    padding-right: 1em !important;
    padding-bottom: 1em !important;

    & .flight-segments-list:first-child .header {
        border-top-left-radius: .28571429rem !important;
        border-top-right-radius: .28571429rem !important;
        margin-top: -8px !important;
    }
    
    & .flight-segments-list .header {
        border-radius: 0px !important;
        margin: -1em !important;
        border-left: 0px !important;
        border-right: 0px !important;
    }

    & .flight-details .ui.divider {
        border: 0px !important;
    }
`;

/**
 * Show information about baggage
 *
 * @param {Object} forwardBaggage  - Baggage details for departuring flight
 * @param {Object} comebackBaggage - Baggage details for returning flight
 */
const PassengerBaggage = ({
    forwardBaggage,
    comebackBaggage,
}: PassengerBaggageProps) => {
    const hasBaggage =
        get(forwardBaggage, 'checked') || get(comebackBaggage, 'checked');
    if (!hasBaggage) {
        return null;
    }

    return (
        <Popup
            trigger={<Icon name="suitcase" color="grey" fitted />}
            position="top center"
            size="small"
            inverted
        >
            <Popup.Content>Travel with baggage</Popup.Content>
        </Popup>
    );
};

/**
 * Single passenger item
 *
 * @param {Object} passenger - An object with passenger details
 */
const Passenger = ({ passenger }: PassengerProps) => {
    return (
        <List.Item>
            <List.Content floated="left">
                <PassengerBaggage
                    forwardBaggage={passenger.forwardBaggage}
                    comebackBaggage={passenger.comebackBaggage}
                />
            </List.Content>
            {passenger.firstName} {passenger.lastName}
        </List.Item>
    );
};

const FlightTicket = ({ booking }: FlightTicketProps) =>
    <Container>
        <Segment vertical>
            <Segment attached="top">
                <Header>
                    Your PNR - {booking.pnr}
                </Header>
                <List size="small">
                    {map(booking.passengers, (passenger, idx) =>
                        <Passenger key={idx} passenger={passenger} />,
                    )}
                </List>
            </Segment>
            <FlightDetails
                className="ui bottom attached segment"
                flight={booking.flight}
            />
        </Segment>
    </Container>;

// Show spinner while loading data
const withSpinner = branch(
    props => props.loading,
    renderComponent(() => <Loader size="large" active />),
);

export default compose(withSpinner)(FlightTicket);
