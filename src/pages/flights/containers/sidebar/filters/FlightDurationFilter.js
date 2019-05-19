/**
 * @flow
 */

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { compose, mapProps, branch, renderNothing } from 'recompose';
import { isEmpty, has, each, min, max } from 'lodash';

import { filterFlightDuration } from '../../../../../actions/flights';

import FlightDurationFilter from '../../../components/sidebar/filters/FlightDurationFilter';

import type { Dispatch } from '../../../../../types';

// Query for airport objects by IATA code
const GET_AIRPORT_QUERY = gql`
    query getAirport(
        $departureAirport: String!
        $arrivalAirport: String!
        $locale: String!
    ) {
        departureAirport: airport(iata: $departureAirport) {
            ...airport
        }
        arrivalAirport: airport(iata: $arrivalAirport) {
            ...airport
        }
    }

    fragment airport on Airport {
        code
        name(lang: $locale)
        city {
            code
            name(lang: $locale)
        }
    }
`;

const withData = graphql(GET_AIRPORT_QUERY, {
    options: ownProps => ({
        variables: {
            departureAirport: ownProps.departureAirport,
            arrivalAirport: ownProps.arrivalAirport,
            locale: ownProps.locale,
        },
    }),
    props: ({
        ownProps,
        data: { loading, departureAirport, arrivalAirport },
    }) => ({
        loading,
        departureAirport: {
            code: ownProps.departureAirport,
            ...departureAirport,
        },
        arrivalAirport: {
            code: ownProps.arrivalAirport,
            ...arrivalAirport,
        },
    }),
});

const mapStateToProps = ({ flights: store, intl }) => ({
    value: store.getIn(['filters', 'flightDuration']),
    locale: intl.get('locale'),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    // Update state of flight duration filter
    onChange: (duration: Array<number>, index) =>
        dispatch(filterFlightDuration(duration, index)),
});

// Calculate min and max duration values for forward and comeback sectors,
// and pass them as props
const props = ownProps => {
    const forwardDurations = [];
    const comebackDurations = [];

    each(ownProps.flights, flight => {
        forwardDurations.push(parseInt(flight.forwardSector.duration, 10));
        if (has(flight, 'comebackSector.duration')) {
            comebackDurations.push(
                parseInt(flight.comebackSector.duration, 10),
            );
        }
    });

    const directions = [];

    const forwardMinDuration = min(forwardDurations);
    const forwardMaxDuration = max(forwardDurations);

    if (
        forwardMinDuration &&
        forwardMaxDuration &&
        forwardMinDuration !== forwardMaxDuration
    ) {
        directions.push({
            name: 'FORWARD',
            loading: ownProps.loading,
            departureAirport: ownProps.departureAirport,
            arrivalAirport: ownProps.arrivalAirport,
            minDuration: forwardMinDuration,
            maxDuration: forwardMaxDuration,
            value: ownProps.value ? ownProps.value.get('FORWARD') : null,
        });
    }

    if (!isEmpty(comebackDurations)) {
        const comebackMinDuration = min(comebackDurations);
        const comebackMaxDuration = max(comebackDurations);

        if (
            comebackMinDuration &&
            comebackMaxDuration &&
            comebackMinDuration !== comebackMaxDuration
        ) {
            directions.push({
                name: 'COMEBACK',
                loading: ownProps.loading,
                departureAirport: ownProps.arrivalAirport,
                arrivalAirport: ownProps.departureAirport,
                minDuration: comebackMinDuration,
                maxDuration: comebackMaxDuration,
                value: ownProps.value ? ownProps.value.get('COMEBACK') : null,
            });
        }
    }

    return {
        directions,
        onChange: ownProps.onChange,
    };
};

// Do not render component if duration for all flights is the same
const withNoDurations = branch(
    ({ directions }) => isEmpty(directions),
    renderNothing,
);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withData,
    mapProps(props),
    withNoDurations,
)(FlightDurationFilter);
