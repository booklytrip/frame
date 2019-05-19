/**
 * @flow
 */

import React from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import styled from 'styled-components';
import classNames from 'classnames';
import { humanizeDuration } from '../../../../lib/date.js';

import { Icon, List } from 'semantic-ui-react';

import type { Sector } from '../../../../types';

type FlightDirectionProps = {
    sector: Sector,
    type: 'outbound' | 'inbound',
};

const RootSegment = styled.div`
    background-color: #f3f7fe
    padding: 7px 10px 4px
    border-radius: 2px
    border: 1px solid #d8eaf1
    color: #636262
`;

const FlightDirection = ({ sector, type }: FlightDirectionProps) => (
    <RootSegment className="header">
        <List horizontal divided>
            <List.Item>
                <Icon
                    name={classNames('arrow circle', {
                        right: type === 'outbound',
                        left: type === 'inbound',
                    })}
                />
                {sector.departureAirport.city.name}
                {' '}
                -
                {' '}
                {sector.arrivalAirport.city.name}
            </List.Item>
            <List.Item>
                <FormattedDate
                    value={sector.departureTime}
                    year="numeric"
                    month="2-digit"
                    day="2-digit"
                />
            </List.Item>
            <List.Item>
                <FormattedMessage
                    id="flights.flightslist.FlightSegmentsList.travelTime"
                    defaultMessage={`Travel time: {time}`}
                    values={{
                        time: humanizeDuration(sector.duration, {
                            magnitudes: ['h', 'm'],
                            skip: false,
                        }),
                    }}
                />
            </List.Item>
        </List>
    </RootSegment>
);

export default FlightDirection;
