import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Icon, List, Message } from 'semantic-ui-react';

import WarnMessage from './WarnMessage';

/**
 * Show user a confirmation message and wan him to print tickets
 */
const ConfirmationMessage = () =>
    <div>
        <Message size="large" color="green">
            <Icon name="check circle" />
            <FormattedMessage
                id="booking.service.header.ConfirmationMessage.content1"
                defaultMessage="Reservation confirmed. Flight documents ready."
            />
        </Message>

        <WarnMessage>
            <List>
                <List.Item>
                    <Icon name="warning circle orange" />
                    <List.Content>
                        <FormattedMessage
                            id="booking.service.header.ConfirmationMessage.content2"
                            defaultMessage="Attention! Please print travel documents."
                        />
                    </List.Content>
                </List.Item>
            </List>
        </WarnMessage>
    </div>;

export default ConfirmationMessage;
