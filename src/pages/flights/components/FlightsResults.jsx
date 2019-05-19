/**
 * @flow
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { compose, branch, renderComponent } from 'recompose';
import { Message, Grid } from 'semantic-ui-react';

import { FlightsList } from './flightslist';
import { Sidebar } from './sidebar';
import ResultsHeader from '../containers/ResultsHeader';
import Preloading from './Preloading';

import type { SearchFlightQuery, Flight } from '../../../types';

type FlightsPesultsProps = {
    loading: boolean,
    hasError: boolean,
    flights?: Array<Flight>,
    rawFlights?: Array<Flight>,
    query: SearchFlightQuery,
};

const ResultsGrid = styled(Grid)`
    margin-top: 2em !important;
`;

const ResultsColumn = styled(Grid.Column)`
    padding-left: 2em !important;
`;

const ResultsHeaderRow = styled(Grid.Row)`
    padding-top: 0 !important;
`;

const FlightsResults = ({ flights, rawFlights, query }: FlightsPesultsProps) =>
    <ResultsGrid>
        <Grid.Column width={4}>
            <Sidebar flights={flights} rawFlights={rawFlights} query={query} />
        </Grid.Column>
        <ResultsColumn width={12}>
            <Grid>
                <ResultsHeaderRow columns={1}>
                    <Grid.Column>
                        <ResultsHeader {...query} />
                    </Grid.Column>
                </ResultsHeaderRow>
                <Grid.Row column={1}>
                    <Grid.Column>
                        <FlightsList flights={flights} query={query} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </ResultsColumn>
    </ResultsGrid>;

const ErrorMessage = () =>
    <Message error>
        <FormattedMessage
            id="flights.FlightsPage.error.noResults"
            defaultMessage="Unable to get list of flights, please try again in couple minutes."
        />
    </Message>;

// Show error message if was unable to get list of flights
const withErrorMessage = branch(
    props => props.hasError,
    renderComponent(ErrorMessage),
);

// Show preloading message while loading flights
const withPreloading = branch(
    props => props.loading,
    renderComponent(() => <Preloading />),
);

export default compose(withPreloading, withErrorMessage)(FlightsResults);
