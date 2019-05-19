import { Map } from 'immutable';

const initialState = new Map({
    booking: false,
    paymentMethod: null,
    paying: false,
});

export default function (state = initialState, action) {
    switch (action.type) {
        // Start booking current flight
        case 'BOOKING.START_BOOKING':
            return state.set('booking', true);
        // Finish booking current flight
        case 'BOOKING.FINISH_BOOKING':
            return state.set('booking', false);
        // Set payment method for current flight
        case 'BOOKING.SET_PAYMENT_METHOD':
            return state.set('paymentMethod', action.paymentMethod);
        // Start paying for current flight
        case 'BOOKING.START_PAYMENT':
            return state.set('paying', true);
        default:
            return state;
    }
}
