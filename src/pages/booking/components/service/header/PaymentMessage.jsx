import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Icon, List, Message } from 'semantic-ui-react';

import WarnMessage from './WarnMessage';

/**
 * Shows message that requires user to complete payment
 */
const PaymentMessage = () =>
    <div>
        <Message size="large" info>
            <Icon name="wait" />
            <FormattedMessage
                id="booking.service.header.PaymentMessage.content1"
                defaultMessage="Flight booking confirmed. Payment pending."
            />
        </Message>

        <WarnMessage>
            <List>
                <List.Item>
                    <Icon name="warning circle orange" />
                    <List.Content>
                        <FormattedMessage
                            id="booking.service.header.PaymentMessage.content2"
                            defaultMessage="As long as the ticket is not paid an airline can change the booked seat price at any time, so we recommend you to pay for the selected flight as soon as possible."
                        />
                    </List.Content>
                </List.Item>
            </List>
        </WarnMessage>
    </div>;

export default PaymentMessage;
