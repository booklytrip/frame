import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Icon, Message } from 'semantic-ui-react';

/**
 * Payment was received but with pending status
 */
const PaymentPendingMessage = () =>
    <Message size="large" info>
        <Icon name="wait" />
        <FormattedMessage
            id="booking.service.header.PaymentPendingMessage.content1"
            defaultMessage="Payment transaction is pending, we will continue when transaction will be completed."
        />
    </Message>;

export default PaymentPendingMessage;
