/**
 * @flow
 */

import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import { Container, Grid } from 'semantic-ui-react';

import { Navigation } from '../../../layouts';
import SearchForm from '../containers/SearchForm';
import FlightsReults from '../containers/FlightsResults';

import type { SearchFlightQuery, Flight } from '../../../types';

type FlightsPageProps = {
    loading: boolean,
    hasError: boolean,
    flights?: Array<Flight>,
    rawFlights?: Array<Flight>,
    match: {
        params: SearchFlightQuery,
    },
};

const HeaderGrid = styled(Grid)`
    background: ${({ theme }) => theme.search.background};
    border-bottom: 2px solid ${({ theme }) =>
        darken(0.1, theme.search.background)};
    margin-bottom: 1em !important;
`;

const PaddedContainer = styled(Container)`
    padding-left: 1em;
    padding-right: 1em;
`;

const FlightsPage = ({ match }: FlightsPageProps) =>
    <Container fluid>
        <HeaderGrid className="flights-header" columns={1}>
            <Grid.Column>
                <PaddedContainer fluid>
                    <Navigation inverted />
                </PaddedContainer>
            </Grid.Column>
            <Grid.Column>
                <PaddedContainer fluid>
                    <SearchForm query={match.params} />
                </PaddedContainer>
            </Grid.Column>
        </HeaderGrid>

        <PaddedContainer fluid>
            <FlightsReults query={match.params} />
        </PaddedContainer>
    </Container>;

export default FlightsPage;
