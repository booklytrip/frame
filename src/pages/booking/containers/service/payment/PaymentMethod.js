import { connect } from 'react-redux';

import { setPaymentMethod } from '../../../../../actions/booking';
import PaymentMethod from '../../../components/service/payment/PaymentMethod.jsx';

const mapStateToProps = ({ booking }) => ({
    activePaymentMethod: booking.get('paymentMethod'),
});

export default connect(mapStateToProps, { setPaymentMethod })(PaymentMethod);
