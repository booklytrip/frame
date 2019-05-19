import { connect } from 'react-redux';

import LastSearch from '../components/LastSearch.jsx';

const mapStateToProps = ({ flights }) => ({
    queries: flights.get('lastSearch').toArray(),
});

export default connect(
    mapStateToProps
)(LastSearch);
