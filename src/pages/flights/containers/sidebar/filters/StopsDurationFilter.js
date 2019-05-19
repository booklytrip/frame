/**
 * @flow
 */

import { connect } from 'react-redux';
import { compose, withProps, branch, renderNothing } from 'recompose';
import { each, min, max } from 'lodash';

import { filterStopsDuration } from '../../../../../actions/flights';

import StopsDurationFilter from '../../../components/sidebar/filters/StopsDurationFilter';

import type { Dispatch } from '../../../../../types';

const mapStateToProps = ({ flights: store }) => ({
    value: store.getIn(['filters', 'stopsDuration']),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onChange: (duration: Array<number>) => {
        dispatch(filterStopsDuration(duration));
    },
});

const props = ownProps => {
    const durations = [];

    // Push each stop duration from forward and comeback segments,
    // to calculate min and max values
    each(ownProps.flights, flight => {
        each(flight.forwardSector.segments, segment => {
            if (segment.stopDuration) {
                durations.push(segment.stopDuration);
            }
        });

        if (flight.comebackSector) {
            each(flight.comebackSector.segments, segment => {
                if (segment.stopDuration) {
                    durations.push(segment.stopDuration);
                }
            });
        }
    });

    return {
        minDuration: min(durations),
        maxDuration: max(durations),
    };
};

// Do not render component if there are no stops or duration is the same
const withNoDurations = branch(
    ({ minDuration, maxDuration }) =>
        !minDuration || !maxDuration || minDuration === maxDuration,
    renderNothing,
);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withProps(props),
    withNoDurations,
)(StopsDurationFilter);
