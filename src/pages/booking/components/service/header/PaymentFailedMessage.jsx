import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Icon, Message } from 'semantic-ui-react';

/**
 * Payment has failed for some reason
 */
const PaymentFailedMessage = () =>
    <Message size="large" color="red">
        <Icon name="warning sign" />
        <FormattedMessage
            id="booking.service.header.PaymentFailedMessage.content1"
            defaultMessage="Payment has failed, please contact with support for clarification."
        />
    </Message>;

export default PaymentFailedMessage;
