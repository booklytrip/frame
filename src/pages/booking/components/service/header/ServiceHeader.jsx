/**
 * @flow
 */

import React from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import styled from 'styled-components';
import { isNil, some, every, indexOf } from 'lodash';

import { Header, Grid, Segment } from 'semantic-ui-react';

import CheckinPendingMessage from './CheckinPendingMessage';
import CheckinRegistrationMessage from './CheckinRegistrationMessage';
import ConfirmationMessage from './ConfirmationMessage';
import PaymentMessage from './PaymentMessage';
import PaymentPendingMessage from './PaymentPendingMessage';
import PaymentFailedMessage from './PaymentFailedMessage';

import type { Booking } from '../../../../../types';

type ServiceHeaderProps = {
    booking: Booking,
};

const OrderNumber = styled(Header)`
    font-weight: 500;
`;

const DateLabel = styled.span`color: #a9a9a9;`;

const OrderNumberValue = styled.span`
    color: ${({ theme }) => theme.booking.service.orderNumber};
    font-weight: 600;
`;

const MessageRow = styled(Grid.Row)`
    padding-top: 0.5rem;
`;

const OrderDate = styled.div`font-size: 16px;`;

const ServiceHeaderWrapper = styled(Segment)`
    border-top-color: ${({ theme }) => theme.segment.borderTopColor} !important;
`;

/**
 * Decide and return correct message depending on current state
 * of booking.
 */
const renderMessage = (booking: Booking) => {
    // Waiting for payment
    if (isNil(booking.payment)) {
        return <PaymentMessage />;
    }

    // Payment is pending
    if (booking.payment.status === 'pending') {
        return <PaymentPendingMessage />;
    }

    // Payment has failed for some reason
    if (booking.payment.status === 'failed') {
        return <PaymentFailedMessage />;
    }

    // Payment was successfully received
    if (booking.payment.status === 'success') {
        if (some(booking.passengers, p => isNil(p.checkin))) {
            return <CheckinRegistrationMessage booking={booking} />;
        }

        const hasPendingCheckin = every(
            booking.passengers,
            p => indexOf(['PENDING', 'ERROR'], p.checkin) !== -1,
        );
        if (hasPendingCheckin) {
            return <CheckinPendingMessage />;
        }

        return <ConfirmationMessage />;
    }
};

/**
 * Show order number, order data and correct message that depends
 * on booking state.
 */
const ServiceHeader = ({ booking }: ServiceHeaderProps) =>
    <ServiceHeaderWrapper>
        <Grid>
            <Grid.Row>
                <Grid.Column width={10} verticalAlign="middle">
                    <OrderNumber as="h2">
                        <FormattedMessage
                            id="booking.service.header.ServiceHeader.orderNumber"
                            defaultMessage="Order number:"
                        />{' '}
                        <OrderNumberValue>{booking.pnr}</OrderNumberValue>
                    </OrderNumber>
                </Grid.Column>
                <Grid.Column width={6} textAlign="right">
                    <OrderDate>
                        <DateLabel>Order date:</DateLabel>
                        <div>
                            <FormattedDate
                                value={booking.createdAt}
                                year="2-digit"
                                month="2-digit"
                                day="2-digit"
                                hour="2-digit"
                                minute="2-digit"
                                timeZoneName="short"
                            />
                        </div>
                    </OrderDate>
                </Grid.Column>
            </Grid.Row>
            <MessageRow columns={1}>
                <Grid.Column>
                    {renderMessage(booking)}
                </Grid.Column>
            </MessageRow>
        </Grid>
    </ServiceHeaderWrapper>;

export default ServiceHeader;
