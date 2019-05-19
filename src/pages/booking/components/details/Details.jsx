/**
 * @flow
 */

import React from 'react';
import { branch, renderComponent } from 'recompose';
import styled from 'styled-components';

import { Loader, Grid, Segment } from 'semantic-ui-react';

import BookingSteps from '../BookingSteps';
import Summary from '../../containers/details/Summary';
import DetailsHeader from './DetailsHeader';
import FlightInformation from './FlightInformation';
import DetailsForm from '../../containers/details/DetailsForm';

import type { Flight } from '../../../../types';

type DetailsProps = {
    flight: Flight,
};

const StepsRow = styled(Grid.Row)`
    padding-top: 0 !important;
`;

const Details = ({ flight }: DetailsProps) =>
    <Grid>
        <StepsRow columns={1}>
            <Grid.Column>
                <Segment basic>
                    <BookingSteps active={1} />
                </Segment>
            </Grid.Column>
        </StepsRow>
        <Grid.Row columns={1}>
            <Grid.Column>
                <DetailsHeader flight={flight} />
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column width={10}>
                <Grid columns={1}>
                    <Grid.Column>
                        <FlightInformation flight={flight} />
                    </Grid.Column>

                    <Grid.Column>
                        <DetailsForm flight={flight} />
                    </Grid.Column>
                </Grid>
            </Grid.Column>

            <Grid.Column width={6}>
                <Summary flight={flight} />
            </Grid.Column>
        </Grid.Row>
    </Grid>;

// Show spinner while loading data
export default branch(
    props => props.loading,
    renderComponent(() => <Loader size="huge" inline="centered" active />),
)(Details);
