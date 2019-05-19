/**
 * Filter flight results by flight duration.
 *
 * @flow
 */

import React from 'react';
import { injectIntl, defineMessages } from 'react-intl';
import styled from 'styled-components';
import { map } from 'lodash';

import { Icon } from 'semantic-ui-react';
import { EllipsisLoader } from 'uikit';
import { TimeRangeSlider } from '../../../../../components';
import FiltersGroup from './FiltersGroup';

import type { Airport, Intl } from '../../../../../types';

type DirectionProps = {
    style: Object,
    direction: {
        name: string,
        loading: boolean,
        departureAirport: Airport,
        arrivalAirport: Airport,
        minDuration: number,
        maxDuration: number,
        value: Array<number>,
    },
    first: boolean,
    onChange: Function,
};

type DirectionNameProps = {
    loading: boolean,
    airport: Airport,
};

type FlightDurationFilterProps = {
    directions: Array<DirectionProps>,
    onChange: Function,
    intl: Intl,
};

const DirectionContent = styled.div`
    margin-top: 2em;
    ${props => props.first && 'margin-top: 0'};
`;

const DirectionNameText = styled.span`font-weight: bold;`;

const DividerIcon = styled(Icon)`
    margin-left: 5px !important;
    margin-right: 5px !important;
`;

const Slider = styled(TimeRangeSlider)`
    margin-top: 1em !important;
    margin-bottom: 1em !important;

    & .noUi-connect {
        background: ${({ theme }) => theme.flights.filters} !important;
    }
`;

const intlMessages = {
    flightDuration: defineMessages({
        title: {
            id: 'filters.sidebar.Filters.flightDuration.title',
            defaultMessage: 'Flight duration',
        },
    }),
};

/**
 * Show flight direction from the airport and to the airport.
 *
 * NOTE: If airport code equals to city code, that could be an airport
 * of metropolitan area. In this case we'll show city name instead
 * of airport name.
 */
const DirectionName = ({ loading, airport }: DirectionNameProps) =>
    <DirectionNameText>
        {loading
            ? <EllipsisLoader size="0.5em" color="rgba(0, 0, 0, 0.6)" inline />
            : airport.code === airport.city.code
              ? airport.city.name
              : airport.name}
    </DirectionNameText>;

const Direction = ({ style, direction, onChange, first }: DirectionProps) =>
    <DirectionContent style={style} first={first}>
        <div>
            <DirectionName
                loading={direction.loading}
                airport={direction.departureAirport}
            />
            <DividerIcon name="angle right" fitted />
            <DirectionName
                loading={direction.loading}
                airport={direction.arrivalAirport}
            />
        </div>

        <Slider
            min={direction.minDuration}
            max={direction.maxDuration}
            value={direction.value}
            step={300}
            onChange={value => {
                onChange(value, direction.name);
            }}
        />
    </DirectionContent>;

const FlightDurationFilter = injectIntl(
    ({ directions, onChange, intl }: FlightDurationFilterProps) =>
        <FiltersGroup
            title={intl.formatMessage(intlMessages.flightDuration.title)}
        >
            {map(directions, (direction, idx) =>
                <Direction
                    key={idx}
                    first={idx === 0}
                    direction={direction}
                    onChange={onChange}
                />,
            )}
        </FiltersGroup>,
);

export default FlightDurationFilter;
