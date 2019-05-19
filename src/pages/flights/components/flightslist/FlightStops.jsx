/**
 * This component shows summary of all stopovers that will heppen during the flight
 * including the city where stopover will happen. If that's a direct flight, without
 * stopovers, the sign that that's a direct flight will be shown.
 *
 * @flow
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { branch, renderComponent } from 'recompose';
import styled from 'styled-components';
import { chain } from 'lodash';
import { humanizeDuration } from '../../../../lib/date.js';

import type { Sector, Segment } from '../../../../types';

type StopoversProps = {
    sector: Sector,
    segments: Array<Segment>,
};

const Stop = styled.div`
    padding-top: 0.3em;
    font-size: 12px;
    line-height: 14px;
    color: #999;
`;

const Direct = styled.div`
    color: #9c0;
    font-size: 1em;
    font-weight: 600;
    padding-top: 0.3em;
`;

/**
 * Render number of stops in provided sector
 */
const FlightStops = ({ sector }: StopoversProps) => (
    <Stop>
        <div>
            <FormattedMessage
                id="flights.flightslist.FlightStops.stops"
                defaultMessage={`{count} {count, plural, one {stop} other {stops}}`}
                values={{ count: sector.stops }}
            />
        </div>
        {chain(sector.segments)
            .filter(segment => !!segment.stopDuration)
            .map((segment, idx) => (
                <div key={idx}>
                    {humanizeDuration(segment.stopDuration, {
                        magnitudes: ['h', 'm'],
                        skip: false,
                    })}{' '}
                    {segment.departureAirport.city.name}
                </div>
            ))
            .value()}
    </Stop>
);

// Render "Direct flight" message if there are not stops
const withDirectFlight = branch(
    ({ sector }) => sector.stops === 0,
    renderComponent(() => (
        <Direct>
            <FormattedMessage
                id="flights.flightslist.FlightStops.directFlight"
                defaultMessage="Direct flight"
            />
        </Direct>
    )),
);

export default withDirectFlight(FlightStops);
