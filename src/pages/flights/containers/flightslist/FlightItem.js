/**
 * @flow
 */

import { withRouter } from 'react-router';
import { compose, withHandlers } from 'recompose';

import { linkTo } from '../../../../router';

import type { Flight } from '../../../../types';

import FlightItem from '../../components/flightslist/FlightItem';

type Props = {
    history: Object,
    flight: Flight,
};

const handlers = {
    // Transition user to booking page for specified flight
    onBook: (props: Props) => () => {
        const { history, flight } = props;
        history.push(
            linkTo('/booking/details', {
                cachedID: flight.general.cachedID,
                priceKey: flight.general.priceKey,
            }),
        );
    },
};

export default compose(withRouter, withHandlers(handlers))(FlightItem);
