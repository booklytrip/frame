/**
 * @flow
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { darken } from 'polished';
import { get, has } from 'lodash';

import { Icon, Label as BaseLabel } from 'semantic-ui-react';

import type { Flight } from '../../../../types';

type FlightLabelsProps = {
    flight: Flight,
    best: boolean,
};

const Label = styled(BaseLabel)`
    margin-bottom: 1rem !important;
    color: #FFFFFF !important;
`;

const BestFlightLabelWrapper = styled(Label)`
    background-color: ${({ theme }) =>
        theme.flights.bestFlightLabel.background} !important;
    border-color: ${({ theme }) =>
        darken(0.2, theme.flights.bestFlightLabel.background)} !important;
    color: ${({ theme }) => theme.flights.bestFlightLabel.color} !important;
`;

const DirectFlightLabelWrapper = styled(Label)`
    background-color: ${({ theme }) =>
        theme.flights.directFlightLabel.background} !important;
    border-color: ${({ theme }) =>
        darken(0.2, theme.flights.directFlightLabel.background)} !important;
    color: ${({ theme }) => theme.flights.directFlightLabel.color} !important;
`;

/**
 * Verifies flight direct and return true if flight is direct in both sides
 *
 * @param {Object} flight - A flight object
 */
const isDirectFlight = (flight: Flight) => {
    return (
        get(flight, 'forwardSector.stops') === 0 &&
        (!has(flight, 'comebackSector') ||
            get(flight, 'comebackSector.stops') === 0)
    );
};

/**
 * Label for best flight option where ratio of price and duration is optimal
 */
const BestFlightLabel = () =>
    <BestFlightLabelWrapper size="large" ribbon>
        <Icon name="thumbs star" />
        <FormattedMessage
            id="flights.flightslist.BestFlightLabel"
            defaultMessage="BEST PRICE / FLIGHT DURATION RATIO"
        />
    </BestFlightLabelWrapper>;

/**
 * Label for flight with direct direction in both sides
 */
const DirectFlightLabel = () =>
    <DirectFlightLabelWrapper size="large" ribbon>
        <Icon name="thumbs up" />
        <FormattedMessage
            id="flights.flightslist.DirectFlightLabel"
            defaultMessage="CHOOSE DIRECT FLIGHT AND SAVE YOUR TIME!"
        />
    </DirectFlightLabelWrapper>;

/**
 * Shows best label for specified flight
 *
 * @param {Object} flight - A flight object
 * @param {Bool}   best   - A flight is best option
 */
const FlightLabels = ({ flight, best }: FlightLabelsProps) => {
    if (best) {
        return <BestFlightLabel />;
    }

    if (isDirectFlight(flight)) {
        return <DirectFlightLabel />;
    }

    return null;
};

export { BestFlightLabel, DirectFlightLabel };

export default FlightLabels;
