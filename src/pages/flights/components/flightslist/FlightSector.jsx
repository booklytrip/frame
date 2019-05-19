/**
 * @flow
 */

import React from 'react';
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl';
import styled from 'styled-components';
import { find } from 'lodash';
import { humanizeDuration } from '../../../../lib/date.js';

import { Icon, Header, Segment } from 'semantic-ui-react';

import { CarrierLogo } from '../../../../components';
import FlightStops from './FlightStops';
import FlightArrivalDays from './FlightArrivalDays';

import type { Sector, SectorType } from '../../../../types';

type SectorHeaderProps = {
    sector: Sector,
    type: SectorType,
};

type FlightSectorProps = {
    sector: Sector,
    type: SectorType,
};

const SectorHeaderWrapper = styled(Header)`
    background: #f4f4f4;
    border-radius: 4px !important;
    border: 1px solid rgba(34, 36, 38, 0.1) !important;
    padding: 7px 10px 4px !important;
    margin-top: 0px !important;
`;

const SectorSubHeader = styled(Header.Subheader)`
    display: inline-block !important;
    margin-left: 5px !important;
`;

const Container = styled(Segment)`padding-top: 0px !important;`;

const PlaneIcon = styled(Icon)`
    font-size: 15px !important;
    display: inline-block !important;
    padding: 0 !important;
    margin-top: -3px !important;
    transform: rotate(
        ${({ direction }) => (direction === 'outbound' ? '45deg' : '-135deg')}
    );
`;

const AirportCode = styled.span`
    font-size: 1.3em;
    color: #68757b;
    font-weight: 400;
`;

const Time = styled.span`
    font-size: 1.3em;
    font-weight: 600;
    color: #324d5b;
    ${props =>
        props.type === 'outbound' ? 'padding-left: 8px' : 'padding-right: 8px'};
`;

const CityName = styled.span`
    color: #636262;
    font-size: 1em;
`;

const Duration = styled.div`
    font-size: 1.1em;
    line-height: 15px;
    border-bottom: 1px solid #e7e7e7;
    padding-bottom: 0.5em;
    margin: 3px 15px 0 15px;
    color: #324d5b;
`;

/**
 * Header component with information of flight direction
 *
 * @param {Object} sector - A flight sector
 * @param {String} type   - Outbound or inbound flight type
 */
const SectorHeader = ({ sector, type }: SectorHeaderProps) => (
    <SectorHeaderWrapper size="tiny" className="ui tiny header">
        <PlaneIcon name="plane" direction={type} />
        <FormattedDate
            value={sector.departureTime}
            year="numeric"
            month="2-digit"
            day="2-digit"
        />
        <SectorSubHeader>
            {type === 'outbound' ? (
                <FormattedMessage
                    id="flights.flightslist.FlightSector.outbound"
                    defaultMessage="Flight out"
                />
            ) : (
                <FormattedMessage
                    id="flights.flightslist.FlightSector.inbound"
                    defaultMessage="Flight back"
                />
            )}
        </SectorSubHeader>
    </SectorHeaderWrapper>
);

/**
 * Component of flight sector for flight from departure point to final arrival point
 *
 * @param {Object} sector   - A flight sector
 * @param {Object} segments - List of segments that the flight consist of
 * @param {String} type     - Outbound or inbound flight type
 */
const FlightSector = ({ sector, type }: FlightSectorProps) => {
    const departureSegment = find(
        sector.segments,
        item => item.departureAirport.code === sector.departureAirport.code,
    );

    return (
        <Container vertical basic>
            <SectorHeader sector={sector} type={type} />

            <table className="ui very basic compact celled table">
                <tbody>
                    <tr>
                        <td className="three wide center aligned">
                            <CarrierLogo carrier={departureSegment.carrier} />
                        </td>
                        <td className="four wide right aligned">
                            <div>
                                <AirportCode>
                                    {sector.departureAirport.code}
                                </AirportCode>
                                &nbsp;
                                <Time type={type}>
                                    <FormattedTime
                                        value={sector.departureTime}
                                        hour12={false}
                                    />
                                </Time>
                            </div>
                            <CityName>
                                {sector.departureAirport.city.name}
                            </CityName>
                        </td>
                        <td className="five wide center aligned">
                            <Duration>
                                {humanizeDuration(sector.duration, {
                                    magnitudes: ['h', 'm'],
                                    skip: false,
                                })}
                            </Duration>

                            <FlightStops sector={sector} />
                        </td>
                        <td className="four wide left aligned">
                            <div>
                                <Time type={type}>
                                    <FormattedTime
                                        value={sector.arrivalTime}
                                        hour12={false}
                                    />
                                </Time>
                                &nbsp;
                                <AirportCode>
                                    {sector.arrivalAirport.code}
                                </AirportCode>
                                <FlightArrivalDays
                                    departureTime={sector.departureTime}
                                    arrivalTime={sector.arrivalTime}
                                />
                            </div>
                            <CityName>
                                {sector.arrivalAirport.city.name}
                            </CityName>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Container>
    );
};

export default FlightSector;
