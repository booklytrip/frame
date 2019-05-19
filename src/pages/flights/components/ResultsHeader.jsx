/**
 * @flow
 */

import React from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import styled from 'styled-components';

import { Popup, Segment, Icon } from 'semantic-ui-react';
import { EllipsisLoader } from 'uikit';
import { get } from 'lodash';

import type { Airport, City, Intl } from '../../../types';

type HeaderProps = {
    wayType: string,
    departureAirport: Airport,
    arrivalAirport: Airport,
    departureDate: string,
    returnDate: string,
    adults: number,
    children: number,
    infants: number,
    loading: boolean,
    intl: Intl,
};

type DirectionProps = {
    loading: boolean,
    city: City,
    airport: string,
    airportName?: string,
};

const RootSegment = styled(Segment)`
    border-bottom: 2px solid ${({ theme }) =>
            theme.flights.headerDivider} !important;
`;

const Header = styled.div`
    font-size: 2em;
    font-weight: 600;
`;

const Subheader = styled.div`
    color: #636262;
    font-size: 1.1em;
`;

const DirectionDividerIcon = styled(Icon)`
    color: #a1b7c3;
    margin: 0px 0.25rem 0px 0.25rem;
`;

const CityName = styled.span`
    color: ${({ theme }) => theme.flights.headerCityName};
`;

const AirportCode = styled.span`
    font-weight: 400;
    color: #bbb;
    margin-left: 5px;
    cursor: help;
`;

/**
 * A direction details
 */
const Direction = ({ loading, city, airport, airportName }: DirectionProps) => (
    <span>
        <CityName>
            {loading ? (
                <EllipsisLoader size="mini" color="rgb(161, 183, 195)" inline />
            ) : (
                get(city, 'name')
            )}
        </CityName>
        <Popup
            as="span"
            trigger={<AirportCode>({airport})</AirportCode>}
            position="top center"
            size="small"
            inverted
        >
            <Popup.Content>{airportName}</Popup.Content>
        </Popup>
    </span>
);

/**
 * A header provides information about directions, departure / arrival dates,
 * and amount of passenger.
 */
const ResultsHeader = ({
    loading,
    wayType,
    departureAirport,
    arrivalAirport,
    departureDate,
    returnDate,
    adults,
    children,
    infants,
    intl,
}: HeaderProps) => (
    <RootSegment basic>
        <Header>
            <Direction
                loading={loading}
                city={departureAirport.city}
                airport={departureAirport.code}
                airportName={departureAirport.name}
            />
            <DirectionDividerIcon name="angle right inline" />
            <Direction
                loading={loading}
                city={arrivalAirport.city}
                airport={arrivalAirport.code}
                airportName={arrivalAirport.name}
            />

            {wayType === 'ROUND_TRIP' && (
                <span>
                    <DirectionDividerIcon name="angle right inline" />
                    <Direction
                        loading={loading}
                        city={departureAirport.city}
                        airport={departureAirport.code}
                        airportName={departureAirport.name}
                    />
                </span>
            )}
        </Header>

        <Subheader>
            <FormattedDate
                value={departureDate}
                year="numeric"
                month="2-digit"
                day="2-digit"
            />
            {wayType === 'ROUND_TRIP' && (
                <span>
                    {' - '}
                    <FormattedDate
                        value={returnDate}
                        year="numeric"
                        month="2-digit"
                        day="2-digit"
                    />
                </span>
            )}

            {adults > 0 && (
                <span>
                    {', '}
                    <FormattedMessage
                        id="flights.Header.adults"
                        defaultMessage={`{adults} {adults, plural,
                            one {adult}
                            other {adults}
                        }`}
                        values={{ adults }}
                    />
                </span>
            )}
            {children > 0 && (
                <span>
                    {', '}
                    <FormattedMessage
                        id="flights.Header.children"
                        defaultMessage={`{children} {children, plural,
                            one {child}
                            other {children}
                        }`}
                        values={{ children }}
                    />
                </span>
            )}
            {infants > 0 && (
                <span>
                    {', '}
                    <FormattedMessage
                        id="flights.Header.infants"
                        defaultMessage={`{infants} {infants, plural,
                            one {infant}
                            other {infants}
                        }`}
                        values={{ infants }}
                    />
                </span>
            )}
        </Subheader>
    </RootSegment>
);

ResultsHeader.defaultProps = {
    children: 0,
    infants: 0,
};

export default ResultsHeader;
