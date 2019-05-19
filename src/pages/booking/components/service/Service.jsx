/**
 * @flow
 */

import React from 'react';
import { compose, branch, renderComponent } from 'recompose';
import styled from 'styled-components';
import { isNil } from 'lodash';

import { Loader, Grid, Segment, Message, Icon } from 'semantic-ui-react';

import BookingSteps from '../BookingSteps';
import { ServiceHeader } from './header';
import Summary from '../../containers/service/Summary';

import PaymentMethod from '../../containers/service/payment/PaymentMethod';
import FlightTickets from './tickets/FlightTickets';

import type { Booking } from '../../../../types';

type BookingServiceProps = {
    booking: Booking,
};

const StepsRow = styled(Grid.Row)`
    padding-top: 0 !important;
`;

/**
 * Return current step depending on booking state
 */
const activeStep = (booking: Booking): number =>
    isNil(booking.payment) ? 2 : 3;

/**
 * Decide and return correct service component depending
 * on current booking state.
 */
const renderService = (booking: Booking) => {
    // Show payment options if paymet was not received
    if (isNil(booking.payment)) {
        return <PaymentMethod paymentMethods={booking.paymentMethods} />;
    }

    // Return flight tickets only if paymet was successfull
    if (booking.payment.status === 'success') {
        return <FlightTickets booking={booking} />;
    }

    return null;
};

/**
 * Represents collection of booking services which will be presented to user
 * depending on booking state.
 */
const BookingService = ({ booking }: BookingServiceProps) =>
    <Grid>
        <StepsRow>
            <Grid.Column>
                <Segment basic>
                    <BookingSteps active={activeStep(booking)} />
                </Segment>
            </Grid.Column>
        </StepsRow>

        <Grid.Row>
            <Grid.Column width={10}>
                <Grid>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <ServiceHeader booking={booking} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            {renderService(booking)}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
            <Grid.Column width={6}>
                <Summary flight={booking.flight} booking={booking} />
            </Grid.Column>
        </Grid.Row>
    </Grid>;

// Show spinner while loading data
const withSpinner = branch(
    props => props.loading,
    renderComponent(() => <Loader size="big" active />),
);

// Show error message if flight does not exists
const withError = branch(
    props => props.error,
    renderComponent(() =>
        <Message error>
            <Icon name="warning sign" />This flight does not exists anymore
        </Message>,
    ),
);

export default compose(withSpinner, withError)(BookingService);
