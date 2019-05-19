/**
 * @flow
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { compose, withState, withHandlers } from 'recompose';
import styled from 'styled-components';

import { leftSeats } from '../../../../lib/flight';

import { Popup, Icon, Segment, Grid, Divider } from 'semantic-ui-react';

import FlightLabels from './FlightLabels';
import FlightSector from './FlightSector';
import FlightDetails from './FlightDetails';
import FlightPrice from './FlightPrice';
import BookButton from './BookButton';

import type { Flight } from '../../../../types';

type FlightItemProps = {
    flight: Flight,
    onBook: Function,
    // Best flight will be highlighted
    best?: boolean,
    showDetails: boolean,
    toggleDetails: boolean,
};

type ToggleDetailsProps = {
    showDetails: boolean,
    onClick: Function,
};

const RootSegment = styled(Segment)`
    transition: box-shadow 0.3s, border-color 0.3s;
    &:hover {
        box-shadow: 0 0 10px 0 rgba(158, 158, 158, 0.5) !important;
        border-color: #a1b8c5 !important;
    }
`;

const GridColumn = styled(Grid.Column)`
    padding-top: 0px !important;
    padding-bottom: 0px !important;
`;

const SeatsLeft = styled.span`
    color: red;
    font-size: 14px;
    padding: 8px 0 0 0;
    line-height: 16px;
    display: inline-block;
`;

const SegmentDivider = styled(Divider)`
    margin-top: 8px !important;
    border-top: 1px solid rgb(231, 231, 231) !important;
`;

const Toggle = styled.div`
    border-top: 1px solid rgba(34, 36, 38, 0.1);
    padding-top: 8px;
`;

const Link = styled.a`cursor: pointer;`;

/**
 * The button show / hide details information of the flight
 *
 * @param {Boolean} showDetails - The current state of button
 * @param {Function} onClick    - The callback for click event
 */
const ToggleDetails = ({ showDetails, onClick }: ToggleDetailsProps) => (
    <Toggle>
        <Popup
            trigger={
                <Link onClick={onClick}>
                    <Icon name="info circle" />
                    {showDetails ? (
                        <FormattedMessage
                            id="flights.flightslist.FlightItem.showLess"
                            defaultMessage="Show less"
                        />
                    ) : (
                        <FormattedMessage
                            id="flights.flightslist.FlightItem.showMore"
                            defaultMessage="Show more"
                        />
                    )}
                </Link>
            }
            position="top center"
            size="small"
            inverted
        >
            <Popup.Content>
                Show {showDetails ? 'less' : 'more'} details about flight
            </Popup.Content>
        </Popup>
    </Toggle>
);

const FlightItem = ({
    flight,
    best,
    onBook,
    showDetails,
    toggleDetails,
}: FlightItemProps) => (
    <RootSegment>
        <FlightLabels flight={flight} best={best} />
        <Segment vertical basic>
            <Grid divided>
                <GridColumn width={12}>
                    <FlightSector
                        sector={flight.forwardSector}
                        type="outbound"
                    />

                    {/* If comebackSector is not defined, that's a ONE_WAY flight */}
                    {flight.comebackSector && (
                        <FlightSector
                            sector={flight.comebackSector}
                            type="inbound"
                        />
                    )}

                    <ToggleDetails
                        showDetails={showDetails}
                        onClick={toggleDetails}
                    />
                </GridColumn>
                <GridColumn textAlign="right" width={4}>
                    <FlightPrice
                        price={flight.general.pricing.avg}
                        totalPrice={flight.general.price.amount}
                        currency={flight.general.price.currency}
                    />
                    <BookButton onClick={onBook} />

                    {leftSeats(flight) < 10 && (
                        <SeatsLeft>
                            <FormattedMessage
                                id="flights.flightslist.FlightItem.seatsLeft"
                                defaultMessage={`Hurry up, only {seats} {seats, plural,
                                            one {seat}
                                            other {seats}
                                        } left!`}
                                values={{ seats: leftSeats(flight) }}
                            />
                        </SeatsLeft>
                    )}
                </GridColumn>
            </Grid>
        </Segment>

        {showDetails && (
            <div>
                <SegmentDivider />
                <FlightDetails flight={flight} basic />
            </div>
        )}
    </RootSegment>
);

// Store state of details toggle
const withDetailsState = withState('showDetails', 'setShowDetails', false);

// Add helper method to toggle details
const handlers = withHandlers({
    toggleDetails: ownProps => () => {
        ownProps.setShowDetails(!ownProps.showDetails);
    },
});

export default compose(withDetailsState, handlers)(FlightItem);
