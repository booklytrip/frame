/**
 * @flow
 */

import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter} from 'react-router';
import {
    format as formatDate,
    max as maxDate,
    subDays,
    addDays,
    differenceInDays,
} from 'date-fns';
import { compose } from 'recompose';
import { range, map, isNil } from 'lodash';

import { linkTo } from '../../../router';
import { PriceMatrix } from '../../../components';

import type { SearchFlightQuery } from '../../../types';

const DATE_FORMAT = 'YYYY-MM-DD';

const GET_FLIGHTS_QUERY = gql`
    query getDestinations (
        $departureAirport: String!
        $arrivalAirport: String!
        $departureDate: String!
        $returnDate: String
        $adults: Int
        $children: Int
        $infants: Int
        $roundTrip: Boolean!
    ) {
        destinations (
            departureAirport: $departureAirport
            arrivalAirport: $arrivalAirport
            departureDate: $departureDate
            returnDate: $returnDate
            adults: $adults
            children: $children
            infants: $infants
            roundTrip: $roundTrip
        ) {
            departureDate
            comebackDate @include(if: $roundTrip)
            price {
                amount
                currency
            }
        }
    }
`;

/**
 * Return pair of dates in range from specified date
 *
 * @param {String} date  - Date from which calculate range
 * @param {String} range - Number of days
 */
const dateRange = (date, range) => {
    const fromDate = maxDate(subDays(date, range), new Date());
    const toDate = addDays(date, range);

    return [formatDate(fromDate, DATE_FORMAT), formatDate(toDate, DATE_FORMAT)];
};

/**
 * Generate array with range of dates
 *
 * @param {String} fromDate - Starting date
 * @param {String} toDate   - Ending date
 */
const datesRangeArray = (fromDate, toDate) =>
    range(0, differenceInDays(toDate, fromDate) + 1).map(day =>
        formatDate(addDays(fromDate, day), 'YYYY-MM-DD'),
    );

const withData = graphql(GET_FLIGHTS_QUERY, {
    options: (query: SearchFlightQuery) => ({
        variables: {
            departureAirport: query.departureAirport,
            arrivalAirport: query.arrivalAirport,
            departureDate: dateRange(query.departureDate, 2).join('|'),
            returnDate: query.returnDate &&
                dateRange(query.returnDate, 2).join('|'),
            adults: query.adults,
            children: query.children,
            infants: query.infants,
            roundTrip: isNil(query.returnDate),
        },
    }),
    props: ({
        query,
        data: { loading, destinations },
    }: {
        query: SearchFlightQuery,
        data: {
            loading: boolean,
            destinations: Array<Object>,
        },
    }) => {
        const roundTrip = query.wayType === 'ROUND_TRIP';

        const mapping = destination => ({
            column: formatDate(destination.departureDate, DATE_FORMAT),
            row: roundTrip
                ? formatDate(destination.comebackDate, DATE_FORMAT)
                : undefined,
            value: destination.price.amount,
        });

        return {
            loading,
            prices: !loading ? map(destinations, mapping) : [],
            columns: datesRangeArray.apply(
                null,
                dateRange(query.departureDate, 2),
            ),
            rows: roundTrip
                ? datesRangeArray.apply(null, dateRange(query.returnDate, 2))
                : null,
        };
    },
});

const mapDispatchToProps = (dispatch, { history, ...props }) => ({
    // Handle on click event and redirect user to flights page, but
    // with select departure and return dates
    onClick: ({ departureDate, returnDate }) => {
        history.psuh(
            linkTo('/flights', {
                ...props,
                departureDate,
                returnDate,
            }),
        );
    },
});

export default compose(withRouter, connect(null, mapDispatchToProps), withData)(
    PriceMatrix,
);
