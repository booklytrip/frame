import { connect } from 'react-redux';
import { slice } from 'lodash';

import FlightsList from '../../components/flightslist/FlightsList';

const mapStateToProps = ({ flights: state }, ownProps) => {
    return {
        limit: state.get('limit'),
        leftFlights: ownProps.flights.length - state.get('limit'),
        flights: slice(ownProps.flights, 0, state.get('limit')),
    };
};

export default connect(mapStateToProps)(FlightsList);
