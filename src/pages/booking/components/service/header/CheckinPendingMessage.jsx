import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Icon, Message } from 'semantic-ui-react';

/**
 * All information was provided, but check-in registration is pending
 */
const CheckinPendingMessage = () =>
    <Message size="large" info>
        <Icon name="wait" />
        <FormattedMessage
            id="booking.service.header.CheckinPendingMessage.content1"
            defaultMessage="Flight documents will be provided after check-in registration will be completed."
        />
    </Message>;

export default CheckinPendingMessage;
