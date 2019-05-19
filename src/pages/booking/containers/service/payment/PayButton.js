import { connect } from 'react-redux';

import { startPayment } from '../../../../../actions/booking.js';
import PayButton from '../../../components/service/payment/PayButton.jsx';

const mapDispathToProps = dispatch => ({
    // Redirect user to payment page
    onClick: paymentMethod => {
        dispatch(startPayment());

        if (window.parent && window.parent.length > 0) {
            // If we are inside the frame, change location of host page
            window.parent.location = paymentMethod.link;
        } else {
            // otherways change location of current page
            window.location = paymentMethod.link;
        }
    },
});

const mapStateToProps = ({ booking }) => ({
    disabled: !booking.get('paymentMethod'),
    processing: booking.get('paying'),
});

export default connect(mapStateToProps, mapDispathToProps)(PayButton);
