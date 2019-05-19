/**
 * @flow
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { compose, branch, renderComponent } from 'recompose';
import styled from 'styled-components';
import { isEmpty, map } from 'lodash';

import { Message, Grid } from 'semantic-ui-react';
import FlightItem from '../../containers/flightslist/FlightItem';
import ShowMoreButton from '../../containers/flightslist/ShowMoreButton';

import type { Flight } from '../../../../types';

type FlightsListProps = {
    flights: Array<Flight>,
    leftFlights: number,
    onBook: Function,
    onShowMore: Function,
};

const FlightsGrid = styled(Grid)`height: 100%;`;

const FlightsList = ({ flights, leftFlights, onBook }: FlightsListProps) => (
    <FlightsGrid columns={1}>
        <Grid.Column>
            {map(flights, (flight, idx) => (
                <FlightItem key={idx} flight={flight} best={idx === 0} />
            ))}
        </Grid.Column>
        <Grid.Column>
            {leftFlights > 0 && <ShowMoreButton leftFlights={leftFlights} />}
        </Grid.Column>
    </FlightsGrid>
);

const NoResultsMessage = () => (
    <Message error>
        <FormattedMessage
            id="flights.flightslist.NoResultsMessage.content"
            defaultMessage="Sorry, we found no flights on this date. Try different dates."
        />
    </Message>
);

// Show message that there are no results
const noResults = branch(
    props => isEmpty(props.flights),
    renderComponent(NoResultsMessage),
);

export default compose(noResults)(FlightsList);
