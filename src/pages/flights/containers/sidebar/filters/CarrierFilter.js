/**
 * @flow
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { isEmpty, each, min, map, without, keys, get } from 'lodash';

import {
    filterCarrier,
    resetCarrierFilters,
} from '../../../../../actions/flights';

import CheckboxList from '../../../components/sidebar/filters/CheckboxList';

import type { Dispatch, FlightSegment } from '../../../../../types';

/**
 * Get all carriers from list of flights and assing the lowest
 * price for each carrier.
 */
const props = ownProps => {
    const carriers: Object = {};

    if (!isEmpty(ownProps.flights)) {
        each(ownProps.flights, flight => {
            const allSegments: Array<FlightSegment> = [
                ...get(flight, 'forwardSector.segments', []),
                ...get(flight, 'comebackSector.segments', []),
            ];

            each(allSegments, segment => {
                const code = segment.carrier.code;
                if (!carriers[code]) {
                    carriers[code] = {
                        carrier: segment.carrier,
                        price: flight.general.pricing.avg,
                    };
                } else {
                    carriers[code].price = min([
                        carriers[code].price,
                        flight.general.pricing.avg,
                    ]);
                }
            });
        });
    }

    return { carriers };
};

const mapStateToProps = ({ flights: state }, ownProps) => ({
    // Map list of carriers in correct format required for CbeckboxList component
    options: map(ownProps.carriers, ({ price, carrier }, code) => ({
        name: carrier.code,
        label: carrier.name,
        checked: !state.hasIn(['filters', 'carriers', code]),
        details: <span>&euro; {price}</span>,
    })),
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps) => ({
    // Change state of specified filter
    onChange: (carrier, enabled) => {
        dispatch(filterCarrier(carrier, !enabled));
    },
    // Select or deselect all filters
    onSelectAll: select => {
        if (select) {
            dispatch(resetCarrierFilters([]));
        } else {
            dispatch(resetCarrierFilters(keys(ownProps.carriers)));
        }
    },
    // Uncheck all filters except specified
    onUncheckOther: carrier => {
        const resetCarriers = without(keys(ownProps.carriers), carrier);
        dispatch(resetCarrierFilters(resetCarriers));
    },
});

export default compose(
    withProps(props),
    connect(mapStateToProps, mapDispatchToProps),
)(CheckboxList);
