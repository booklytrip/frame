/**
 * @flow
 */

import { connect } from 'react-redux';

import { filterNightStops } from '../../../../../actions/flights';

import NightStopsFilter
    from '../../../components/sidebar/filters/NightStopsFilter';

import type { Dispatch } from '../../../../../types';

const mapStateToProps = ({ flights }) => ({
    enabled: flights.getIn(['filters', 'nightStops']),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    // Handle onChange event to define state of night stops filter
    onChange: (e, { checked }) => {
        dispatch(filterNightStops(checked));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(NightStopsFilter);
