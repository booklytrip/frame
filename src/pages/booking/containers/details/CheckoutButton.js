import { connect } from 'react-redux';

import CheckoutButton from '../../components/details/CheckoutButton.jsx';

const mapStateToProps = ({ booking }) => ({
    processing: booking.get('booking'),
});

export default connect(
    mapStateToProps
)(CheckoutButton);
