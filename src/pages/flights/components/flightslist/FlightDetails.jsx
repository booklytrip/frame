/**
 * @flow
 */

import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import { Segment, Divider } from 'semantic-ui-react';
import FlightSegmentsList from './FlightSegmentsList.jsx';

import type { Flight } from '../../../../types';

type FlightDetailsProps = {
    className?: string,
    flight: Flight,
    basic: boolean,
};

const RootSegment = styled(Segment)`
    padding: 7px 0px 0px 0px !important;

    & .flight-segments-list:first-child .header {
        margin-top: 0px !important;
    }

    & .flight-segments-list .header {
        margin-top: -1em !important;
    }
`;

const FlightDetails = ({ className, basic, flight }: FlightDetailsProps) => (
    <RootSegment
        className={classNames('flight-details', className)}
        basic={basic}
    >
        <FlightSegmentsList sector={flight.forwardSector} type="outbound" />

        {flight.comebackSector && (
            <div>
                <Divider hidden />

                <FlightSegmentsList
                    sector={flight.comebackSector}
                    type="inbound"
                />
            </div>
        )}
    </RootSegment>
);

export default FlightDetails;
