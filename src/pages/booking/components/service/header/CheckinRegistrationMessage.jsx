import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Icon, List, Message } from 'semantic-ui-react';
import { subDays } from 'date-fns';

import WarnMessage from './WarnMessage';

import type { Booking } from '../../../../../types';

type CheckinRegistrationMessageProps = {
    booking: Booking,
};

// The number of days before flight check-in opens
const CHECKIN_DAYS = 2;

/**
 * Show message that requires user to enter information required for
 * check-in registration.
 */
const CheckinRegistrationMessage = ({
    booking,
}: CheckinRegistrationMessageProps) =>
    <div>
        <Message size="large" info>
            <Icon name="wait" />
            <FormattedMessage
                id="booking.service.header.CheckinRegistrationMessage.content1"
                defaultMessage="Your selected travel route requires a registration to the flight (check-in) online. Please fill in additional passenger data."
            />
        </Message>

        <WarnMessage>
            <List>
                <List.Item>
                    <Icon name="warning circle orange" />
                    <List.Content>
                        <FormattedMessage
                            id="booking.service.header.CheckinRegistrationMessage.content2"
                            defaultMessage={`Attention! Required data must be filled by {fillByDate, date, medium}`}
                            values={{
                                fillByDate: subDays(
                                    booking.flight.general.departureDate,
                                    CHECKIN_DAYS,
                                ),
                            }}
                        />
                    </List.Content>
                </List.Item>
                <List.Item>
                    <Icon name="warning circle orange" />
                    <List.Content>
                        <FormattedMessage
                            id="booking.service.header.CheckinRegistrationMessage.content3"
                            defaultMessage="Attention! If you do not have or forget to print the Boarding Passes you will have to pay 140 EUR additionally for each ticket at the airport."
                        />
                    </List.Content>
                </List.Item>
            </List>
        </WarnMessage>
    </div>;

export default CheckinRegistrationMessage;
