/**
 * @flow
 */

import { connect } from 'react-redux';
import { showMoreFlights } from '../../../../actions/flights';

import ShowMoreButton from '../../components/flightslist/ShowMoreButton';

import type { Dispatch } from '../../../../types';

type Props = {
    leftFlights: number,
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Props) => ({
    onClick() {
        dispatch(showMoreFlights(ownProps.leftFlights));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ShowMoreButton);
