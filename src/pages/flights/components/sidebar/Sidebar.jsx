/**
 * @flow
 */

import React from 'react';
import styled from 'styled-components';

import { Grid } from 'semantic-ui-react';
// import PriceAlert from './PriceAlert';
import { Filters } from './filters';

import type { Flight, SearchFlightQuery } from '../../../../types';

type SidebarProps = {
    loading: boolean,
    flights: Array<Flight>,
    rawFlights: Array<Flight>,
    query: SearchFlightQuery,
};

const GridColumn = styled(Grid.Column)`
    padding: 0.5em 0.5em 0.5em 1em !important;
`;

const Sidebar = ({ ...props }: SidebarProps) =>
    <Grid columns={1}>
        {/*<GridColumn>
            <PriceAlert />
        </GridColumn>*/}
        <GridColumn>
            <Filters {...props} />
        </GridColumn>
    </Grid>;

export default Sidebar;
