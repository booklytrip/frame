/**
 * @flow
 */

import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { find, get, each, isNil } from 'lodash';

import Summary from '../../components/summary/Summary';

// Calculate baggage price for all flight directions
export const sumBaggagePrice = (passenger, type) => {
    let totalPrice = null;

    [
        get(passenger, `forwardBaggage.${type}`),
        get(passenger, `comebackBaggage.${type}`),
    ].forEach(bags => {
        if (!isNil(bags)) {
            bags.forEach(({ price }) => {
                if (price && price.amount > 0) {
                    if (totalPrice === null) {
                        totalPrice = price;
                    } else {
                        totalPrice.amount += price.amount;
                    }
                }
            });
        }
    });

    return totalPrice;
};

const props = withProps(({ flight, booking, activePaymentMethod }) => {
    let transactionFee = null;
    let totalPriceAmount = booking.totalPrice.amount;

    // If payment object is defined, we can get payment directly from it
    if (booking.payment) {
        transactionFee = booking.payment.transactionFee;
    } else if (activePaymentMethod) {
        // Calculate transaction fee and add it to total price
        const paymentMethod = find(booking.paymentMethods, {
            id: activePaymentMethod,
        });

        transactionFee = paymentMethod.transactionFee;
        totalPriceAmount += transactionFee;
    }

    const baggagePrice = { cabin: null, checked: null };
    each(booking.passengers, passenger => {
        ['cabin', 'checked'].forEach(type => {
            const price = sumBaggagePrice(passenger, type);
            if (price !== null) {
                if (!baggagePrice[type]) {
                    baggagePrice[type] = price;
                } else {
                    baggagePrice[type].amount += price.amount;
                }
            }
        });
    });

    return {
        prices: {
            flight: flight.general.price,
            transactionFee: transactionFee && {
                amount: transactionFee,
                currency: flight.general.price.currency,
            },
            total: {
                amount: totalPriceAmount,
                currency: flight.general.price.currency,
            },
            baggage: baggagePrice,
        },
        passengers: booking ? booking.passengers : null,
    };
});

export default compose(
    connect(({ booking }) => ({
        activePaymentMethod: booking.get('paymentMethod'),
    })),
    props,
)(Summary);
