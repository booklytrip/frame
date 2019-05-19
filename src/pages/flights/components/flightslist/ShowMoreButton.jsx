/**
 * This button tirggers event that shows next set of
 * flight results untill the end will be reched.
 *
 * @flow
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { darken } from 'polished';

import { Button as BaseButton } from 'semantic-ui-react';

import { FLIGHTS_LIMIT_STEP } from '../../../../reducers/flights';

type ShowMoreButtonProps = {
    onClick: Function,
    leftFlights: number,
};

const Button = styled(BaseButton)`
    font-weight: normal;
    padding-top: 1em;
    padding-bottom: 1em;
    background: ${({ theme }) =>
        theme.flights.showMoreButton.background} !important;
    color: ${({ theme }) => theme.flights.showMoreButton.color} !important;
    
    &:hover {
        background: ${({ theme }) =>
            darken(0.2, theme.flights.showMoreButton.background)} !important;
    }
`;

const ShowMoreButton = ({ onClick, leftFlights }: ShowMoreButtonProps) =>
    <Button onClick={onClick} size="big" fluid>
        <FormattedMessage
            id="flights.flightslist.ShowMoreButton.label"
            defaultMessage={`Show next {flights} {flights, plural, one {flight} other {flights}}!`}
            values={{
                flights:
                    leftFlights > FLIGHTS_LIMIT_STEP
                        ? FLIGHTS_LIMIT_STEP
                        : leftFlights,
            }}
        />
    </Button>;

export default ShowMoreButton;
