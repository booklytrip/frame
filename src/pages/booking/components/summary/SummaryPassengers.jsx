/**
 * @flow
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { get, map } from 'lodash';

import { Popup, Icon, List, Segment } from 'semantic-ui-react';
import Subheader from './Subheader';

import type { Baggage, Passenger, Intl } from '../../../../types';

type SummaryPassengerBaggageProps = {
    forwardBaggage: Baggage,
    comebackBaggage: Baggage,
    intl: Intl,
};

type SummaryPassengersProps = {
    passengers: Array<Passenger>,
};

type SummaryPassengerProps = {
    passenger: Passenger,
};

/**
 * Show information about baggage
 *
 * @param {Object} forwardBaggage  - Baggage details for departuring flight
 * @param {Object} comebackBaggage - Baggage details for returning flight
 */
const SummaryPassengerBaggage = ({
    forwardBaggage,
    comebackBaggage,
    intl,
}: SummaryPassengerBaggageProps) => {
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
            <Popup.Content>
                <FormattedMessage
                    id="booking.summary.SummaryPassengerBaggage.popup"
                    defaultMessage="Travel with baggage"
                />
            </Popup.Content>
        </Popup>
    );
};

/**
 * Single passenger item
 *
 * @param {Object} passenger - An object with passenger details
 */
const SummaryPassenger = ({ passenger }: SummaryPassengerProps) => {
    return (
        <List.Item>
            <List.Content floated="right">
                <SummaryPassengerBaggage
                    forwardBaggage={passenger.forwardBaggage}
                    comebackBaggage={passenger.comebackBaggage}
                />
            </List.Content>
            {passenger.firstName} {passenger.lastName}
        </List.Item>
    );
};

/**
 * Presents list of passengers
 *
 * @param {Array} passengers - List of passengers
 */
const SummaryPassengers = ({ passengers }: SummaryPassengersProps) =>
    <Segment attached>
        <Subheader as="h4">
            <FormattedMessage
                id="booking.summary.Summary.SummaryPassengers.header"
                defaultMessage="Passengers"
            />
        </Subheader>

        <List size="small">
            {map(passengers, (passenger, idx) =>
                <SummaryPassenger key={idx} passenger={passenger} />,
            )}
        </List>
    </Segment>;

export default SummaryPassengers;
