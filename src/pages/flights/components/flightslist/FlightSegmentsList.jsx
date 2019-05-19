/**
 * @flow
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { map } from 'lodash';

import { Segment, Table } from 'semantic-ui-react';

import FlightDirection from './FlightDirection.jsx';
import FlightSegment from './FlightSegment.jsx';
import FlightStop from './FlightStop.jsx';

import type { Sector } from '../../../../types';

type FlightSegmentsListProps = {
    sector: Sector,
    type: 'outbound' | 'inbound',
};

const RootSegment = styled(Segment)`
    padding-top: 0px !important;
    padding-bottom: 0px !important;
`;

const DetailsTable = styled(Table)`margin-bottom: 0px !important;`;

const TableCell = styled(Table.Cell)`color: #636262;`;

const Segments = styled.div`
    & tr:last-child td {
        padding-bottom: 0px !important;
    }
`;

const FlightSegmentsList = ({ sector, type }: FlightSegmentsListProps) => (
    <RootSegment className="flight-segments-list" vertical basic>
        <FlightDirection sector={sector} type={type} />

        <DetailsTable basic="very" fixed>
            <Table.Header>
                <Table.Row>
                    <TableCell>
                        <FormattedMessage
                            id="flights.flightslist.FlightSegmentsList.header.departure"
                            defaultMessage="Departure"
                        />
                    </TableCell>
                    <TableCell>
                        <FormattedMessage
                            id="flights.flightslist.FlightSegmentsList.header.arrival"
                            defaultMessage="Arrival"
                        />
                    </TableCell>
                    <TableCell>
                        <FormattedMessage
                            id="flights.flightslist.FlightSegmentsList.header.duration"
                            defaultMessage="Duration"
                        />
                    </TableCell>
                    <TableCell>
                        <FormattedMessage
                            id="flights.flightslist.FlightSegmentsList.header.carrier_flight_number"
                            defaultMessage="Carrier, flight number"
                        />
                    </TableCell>
                </Table.Row>
            </Table.Header>
        </DetailsTable>

        {map(sector.segments, (segment, idx) => (
            <Segments key={idx}>
                <FlightSegment segment={segment} />
                {sector.segments.length - 1 !== idx && (
                    <FlightStop segments={sector.segments} segment={segment} />
                )}
            </Segments>
        ))}
    </RootSegment>
);

export default FlightSegmentsList;
