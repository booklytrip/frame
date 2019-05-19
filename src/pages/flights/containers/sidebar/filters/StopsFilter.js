/**
 * @flow
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { injectIntl, defineMessages } from 'react-intl';
import { chain, min, get, map, has, each, isEmpty } from 'lodash';

import { filterStops, resetStopsFilters } from '../../../../../actions/flights';

import CheckboxList from '../../../components/sidebar/filters/CheckboxList';

import type { Dispatch } from '../../../../../types';

const intlMessages = defineMessages({
    direct: {
        id: 'flights.sidebar.StopsFilter.direct',
        defaultMessage: 'Direct flight',
    },
    stops: {
        id: 'flights.sidebar.StopsFilter.stops',
        defaultMessage: '{stops} {stops, plural, one {stop} other {stops}}',
    },
});

/**
 * Get list of all available stops across of all flights and assign the
 * lowest price for each stop.
 */
const props = ownProps => {
    const stops: Object = {};

    if (!isEmpty(ownProps.flights)) {
        each(ownProps.flights, flight => {
            const currentStops = get(flight, 'forwardSector.stops');
            if (!has(stops, currentStops)) {
                stops[currentStops] = flight.general.pricing.avg;
            } else {
                stops[currentStops] = min([
                    stops[currentStops],
                    flight.general.pricing.avg,
                ]);
            }
        });
    }

    return { stops };
};

const mapStateToProps = ({ flights: state }, ownProps) => ({
    // Map list of stops in correct format required for CbeckboxList component
    options: map(ownProps.stops, (price, stops) => ({
        name: parseInt(stops, 10),
        label:
            parseInt(stops, 10) === 0
                ? ownProps.intl.formatMessage(intlMessages.direct)
                : ownProps.intl.formatMessage(intlMessages.stops, { stops }),
        checked: !state.hasIn(['filters', 'stops', parseInt(stops, 10)]),
        details: (
            <span>
                &euro; {price}
            </span>
        ),
    })),
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps) => ({
    // Change state of specified filter
    onChange: (stops, enabled) => {
        dispatch(filterStops(stops, !enabled));
    },
    // Select or deselect all filters
    onSelectAll: select => {
        if (select) {
            dispatch(resetStopsFilters([]));
        } else {
            const stops = chain(ownProps.stops)
                .keys()
                .map(k => parseInt(k, 10))
                .value();

            dispatch(resetStopsFilters(stops));
        }
    },
    // Uncheck all filters except specified
    onUncheckOther: stops => {
        const resetStops = chain(ownProps.stops)
            .keys()
            .map(k => parseInt(k, 10))
            .without(stops)
            .value();

        dispatch(resetStopsFilters(resetStops));
    },
});

export default compose(
    injectIntl,
    withProps(props),
    connect(mapStateToProps, mapDispatchToProps),
)(CheckboxList);
