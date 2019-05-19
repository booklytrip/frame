/**
 * The component represents detailed information about single stopover during
 * the flight.
 *
 * @flow
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withProps } from 'recompose';
import styled from 'styled-components';

import { nextSegment } from '../../../../lib/flight';
import { humanizeDuration } from '../../../../lib/date';

import { Icon, List as BaseList } from 'semantic-ui-react';

import type { Segment } from '../../../../types';

type FlightStopProps = {
    arrivalSegment: Segment,
    segments: Array<Segment>,
    segment: Segment,
};

const RootSegment = styled.div`
    margin: 10px 0;
    padding: 5px 0;
    border-top: 1px dashed #e7e7e7;
    border-bottom: 1px dashed #e7e7e7;
`;

const RefreshIcon = styled(Icon)`
    position: relative;
    top: 2px;
`;

const List = styled(BaseList)`color: #de7c26;`;

const FlightStop = ({ arrivalSegment, segments, segment }: FlightStopProps) => (
    <RootSegment>
        <List size="small" horizontal divided>
            <BaseList.Item>
                <RefreshIcon name="refresh" />
                <FormattedMessage
                    id="flights.flightslist.FlightStop.transfer"
                    defaultMessage={`Transfer {duration}`}
                    values={{
                        duration: humanizeDuration(
                            arrivalSegment.stopDuration,
                            {
                                magnitudes: ['h', 'm'],
                                skip: false,
                            },
                        ),
                    }}
                />
            </BaseList.Item>
            <BaseList.Item>
                {segment.arrivalAirport.name ===
                segment.arrivalAirport.city.name ? (
                    segment.arrivalAirport.city.name
                ) : (
                    `${segment.arrivalAirport.name}, ${segment.arrivalAirport
                        .city.name}`
                )}
            </BaseList.Item>
        </List>
    </RootSegment>
);

// Find next segment following after provided segment
const props = withProps(ownProps => ({
    arrivalSegment: nextSegment(ownProps),
}));

export default props(FlightStop);
