/**
 * @flow
 */

/**
 * Show that we are processing current flight
 */
export const startBooking = () => ({
    type: 'BOOKING.START_BOOKING',
});

/**
 * Show that we have finished processing current flight
 */
export const finishBooking = () => ({
    type: 'BOOKING.FINISH_BOOKING',
});

/**
 * Sets payment method for current booking
 *
 * @param {String} paymentMethod - A name of payment method
 */
export const setPaymentMethod = (paymentMethod: string) => ({
    type: 'BOOKING.SET_PAYMENT_METHOD',
    paymentMethod,
});

/**
 * Start payment process for current booking
 *
 * @param {String} bookingId - A booking identification
 */
export const startPayment = () => ({
    type: 'BOOKING.START_PAYMENT',
});
