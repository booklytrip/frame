/**
 * @flow
 */

import React from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import styled from 'styled-components';
import { humanizeDuration } from '../../../../lib/date';

import { Icon, Segment, Header as BaseHeader, List } from 'semantic-ui-react';
import Subheader from './Subheader';

import type { Flight, Sector } from '../../../../types';

type SummarySectorsProps = {
    flight: Flight,
};

const RootSegment = styled(Segment)`
    padding-bottom: 0;
`;

const Header = styled(BaseHeader)`
    font-size: 14px !important;
    line-height: 14px !important;
`;

const HeaderIcon = styled(Icon)`
    font-size: 9px !important;
    vertical-align: middle !important;
    height: 14px !important;
    margin: 0 5px 0 5px !important;
`;

const SummarySector = ({ sector }: { sector: Sector }) =>
    <RootSegment basic vertical>
        <Header size="small">
            {sector.departureAirport.city.name} ({sector.departureAirport.code})
            <HeaderIcon name=" right arrow" fitted />
            {sector.arrivalAirport.city.name} ({sector.arrivalAirport.code})
        </Header>

        <List size="small">
            <List.Item>
                <List.Content floated="right">
                    <FormattedDate
                        value={sector.departureTime}
                        year="2-digit"
                        month="2-digit"
                        day="2-digit"
                        hour="2-digit"
                        minute="2-digit"
                    />
                </List.Content>
                <FormattedMessage
                    id="booking.summary.SumamrySector.departure"
                    defaultMessage="Departure"
                />
            </List.Item>
            <List.Item>
                <List.Content floated="right">
                    <FormattedDate
                        value={sector.arrivalTime}
                        year="2-digit"
                        month="2-digit"
                        day="2-digit"
                        hour="2-digit"
                        minute="2-digit"
                    />
                </List.Content>
                <FormattedMessage
                    id="booking.summary.SumamrySector.arrival"
                    defaultMessage="Arrival"
                />
            </List.Item>
            <List.Item>
                <List.Content floated="right">
                    {humanizeDuration(sector.duration, {
                        magnitudes: ['h', 'm'],
                        skip: false,
                    })}
                </List.Content>
                <FormattedMessage
                    id="booking.summary.SumamrySector.duration"
                    defaultMessage="Flight duration"
                />
            </List.Item>
        </List>
    </RootSegment>;

const SummarySectors = ({ flight }: SummarySectorsProps) =>
    <Segment attached>
        <Subheader as="h4">
            <FormattedMessage
                id="booking.summary.Summary.flight.header"
                defaultMessage="Flight information"
            />
        </Subheader>

        <SummarySector sector={flight.forwardSector} />
        {flight.comebackSector &&
            <SummarySector sector={flight.comebackSector} />}
    </Segment>;

export default SummarySectors;
