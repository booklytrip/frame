/**
 * @flow
 */

import React from 'react';
import styled from 'styled-components';
import { format as formatDate } from 'date-fns';
import { humanizeDuration } from '../../../../lib/date.js';

import { Table } from 'semantic-ui-react';
import { CarrierLogo as BaseCarrierLogo } from '../../../../components';
import FlightArrivalDays from './FlightArrivalDays.jsx';

import type { Segment } from '../../../../types';

type FlightSegmentProps = {
    segment: Segment,
};

const SegmentTable = styled(Table)`margin-bottom: 0px;`;

const LargeText = styled.p`
    font-weight: 600;
    font-size: 1.2em;
    line-height: 18px;
    margin: 0 0 5px 0;
`;

const NormalText = styled.p`line-height: 18px;`;

const MediumText = styled.p`font-size: 1.1em;`;

const CarrierCell = styled(Table.Cell)`display: flex;`;

const Carrier = styled.div`
    float: left;
    line-height: 22px;
`;

const CarrierLogo = styled(BaseCarrierLogo)`
    float: left;
    margin-right: 10px;
`;

const TIME_FORMAT = 'HH:mm';

const FlightSegment = ({ segment }: FlightSegmentProps) => (
    <SegmentTable basic="very" fixed>
        <Table.Body>
            <Table.Row verticalAlign="top">
                <Table.Cell>
                    <LargeText>
                        {formatDate(segment.departureTime, TIME_FORMAT)}{' '}
                        {segment.departureAirport.code}
                    </LargeText>
                    <NormalText>
                        {segment.departureAirport.name ===
                        segment.departureAirport.city.name ? (
                            segment.departureAirport.city.name
                        ) : (
                            `${segment.departureAirport.name}, ${segment
                                .departureAirport.city.name}`
                        )}
                    </NormalText>
                </Table.Cell>
                <Table.Cell>
                    <LargeText>
                        {formatDate(segment.arrivalTime, TIME_FORMAT)}{' '}
                        {segment.arrivalAirport.code}
                        <FlightArrivalDays
                            departureTime={segment.departureTime}
                            arrivalTime={segment.arrivalTime}
                        />
                    </LargeText>
                    <NormalText>
                        {segment.arrivalAirport.name ===
                        segment.arrivalAirport.city.name ? (
                            segment.arrivalAirport.city.name
                        ) : (
                            `${segment.arrivalAirport.name}, ${segment
                                .arrivalAirport.city.name}`
                        )}
                    </NormalText>
                </Table.Cell>
                <Table.Cell>
                    <MediumText>
                        {humanizeDuration(segment.duration, {
                            magnitudes: ['h', 'm'],
                            skip: false,
                        })}
                    </MediumText>
                </Table.Cell>
                <CarrierCell>
                    <CarrierLogo carrier={segment.carrier} />

                    <Carrier>
                        {segment.carrier.name}
                        <br />
                        {segment.flightNumber}
                    </Carrier>
                </CarrierCell>
            </Table.Row>
        </Table.Body>
    </SegmentTable>
);

export default FlightSegment;
