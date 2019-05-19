/**
 * Represents a tag of single search request. Shows departure
 * and arrival airports and is clickable to redirect user to
 * search results.
 *
 * @flow
 */
import React from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Icon, Label, Popup } from 'semantic-ui-react';
import { EllipsisLoader } from 'uikit';

import type { Airport, SearchFlightQuery, Intl } from '../../../types';

type LastSearchItemProps = {
    className?: string,
    style?: Object,
    loading: boolean,
    query: SearchFlightQuery,
    departureAirport: Airport,
    arrivalAirport: Airport,
    onClick: Function,
    onRemove: Function,
    intl: Intl,
};

type DirectionsProps = {
    from: Airport,
    to: Airport,
};

const ArrowIcon = styled(Icon)`
    width: auto;
    margin: 0 5px 0 5px !important;
`;

const DirectionsSegment = styled.span`font-weight: 400;`;

const ItemLabel = styled(Label)`
    opacity: 0.8;
    background-color: ${({ theme }) =>
        theme.search.lastSearchItem.background} !important;
    color: ${({ theme }) => theme.search.lastSearchItem.color} !important;
`;

/**
 * Presents direction between two airports
 *
 * @param {Object} from - Departure airport
 * @param {Object} to   - Arrival airport
 */
const Directions = ({ from, to }: DirectionsProps) =>
    <DirectionsSegment>
        {from.code === from.city.code ? from.city.name : from.name}{' '}
        <ArrowIcon name="arrow right" />{' '}
        {to.code === to.city.code ? to.city.name : to.name}
    </DirectionsSegment>;

/**
 * Presents single search request
 */
const LastSearchItem = injectIntl(
    ({
        style,
        className,
        loading,
        query,
        departureAirport,
        arrivalAirport,
        onClick,
        onRemove,
        intl,
    }: LastSearchItemProps) =>
        <Popup
            type={null}
            trigger={
                <ItemLabel
                    as="a"
                    className={className}
                    style={style}
                    onClick={onClick}
                    size="large"
                >
                    {loading
                        ? <EllipsisLoader
                              size="0.5em"
                              color="rgba(255,255,255,0.5)"
                              inline
                          />
                        : <Directions
                              from={departureAirport}
                              to={arrivalAirport}
                          />}
                    <Icon
                        name="delete label"
                        onClick={e => {
                            e.stopPropagation();
                            onRemove();
                        }}
                    />
                </ItemLabel>
            }
            position="top center"
            size="small"
            wide
            inverted
        >
            <Popup.Content>
                <Icon name="time" />
                {intl.formatDate(query.departureDate, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })}
                {query.returnDate &&
                    <span>
                        {' - '}
                        {intl.formatDate(query.returnDate, {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        })}
                    </span>}
            </Popup.Content>
        </Popup>,
);

export default LastSearchItem;
