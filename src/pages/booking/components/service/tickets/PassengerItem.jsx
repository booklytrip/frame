/**
 * Item of single passenger details and link to his tickets
 *
 * @flow
 */

import React from 'react';
import styled from 'styled-components';

import { Grid, List } from 'semantic-ui-react';

import CheckinButton from './CheckinButton.jsx';
import TicketsLinks from './TicketsLinks.jsx';

import type { Passenger, Booking } from '../../../../../types';

type PassengerItemProps = {
    booking: Booking,
    passenger: Passenger,
};

const GridRow = styled(Grid.Row)`
    padding-left: .5em !important;
    padding-right: .5em !important;
`;

const GridColumn = styled(Grid.Column)`
    margin: 0 !important;
`;

const GridFluidColumn = styled(GridColumn)`
    flex: 1 1 auto !important;
`;

const PassengerName = styled.div`
    font-size: 1.2em;
    font-weight: 600;
`;

const PassengerType = styled.div`
    text-transform: uppercase;
    font-size: 0.9em;
    color: #999999;
`;

const PassengerItem = ({ booking, passenger }: PassengerItemProps) =>
    <GridRow>
        <GridColumn>
            <PassengerName>
                {passenger.firstName} {passenger.lastName}
            </PassengerName>
            <PassengerType>
                {passenger.type}
            </PassengerType>
        </GridColumn>

        <GridFluidColumn verticalAlign="right">
            <List horizontal>
                <List.Item>
                    <TicketsLinks booking={booking} />
                </List.Item>
                {passenger.checkin === 'PENDING' &&
                    <List.Item>
                        <CheckinButton passenger={passenger} />
                    </List.Item>}
            </List>
        </GridFluidColumn>
    </GridRow>;

export default PassengerItem;
