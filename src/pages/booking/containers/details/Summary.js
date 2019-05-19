/**
 * @flow
 */

import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { getFormValues } from 'redux-form';
import { each, get } from 'lodash';

import Summary from '../../components/summary/Summary';

// Calculate baggage price for all flight directions
const sumBaggagePrice = (passenger, type, currency) => {
    let totalPrice = null;

    [
        get(passenger, `forwardBaggage.${type}.price`),
        get(passenger, `comebackBaggage.${type}.price`),
    ].forEach(price => {
        if (price && parseFloat(price) > 0) {
            if (totalPrice === null) {
                totalPrice = {
                    amount: parseFloat(price),
                    currency: currency,
                };
            } else {
                totalPrice.amount += parseFloat(price);
            }
        }
    });

    return totalPrice;
};

const props = withProps(({ flight, formValues }) => {
    let totalPriceAmount = flight.general.price.amount;

    // Get total baggage price
    const baggagePrice = { cabin: null, checked: null };
    each(formValues.passengers, passengerType => {
        each(passengerType, passenger => {
            ['cabin', 'checked'].forEach(type => {
                const price = sumBaggagePrice(
                    passenger,
                    type,
                    flight.general.price.currency,
                );
                if (price !== null) {
                    if (!baggagePrice[type]) {
                        baggagePrice[type] = price;
                    } else {
                        baggagePrice[type].amount += price.amount;
                    }
                }
            });
        });
    });

    // Add baggage price to the total price
    if (baggagePrice.cabin) {
        totalPriceAmount += baggagePrice.cabin.amount;
    }
    if (baggagePrice.checked) {
        totalPriceAmount += baggagePrice.checked.amount;
    }

    return {
        prices: {
            flight: flight.general.price,
            total: {
                amount: totalPriceAmount,
                currency: flight.general.price.currency,
            },
            baggage: baggagePrice,
        },
    };
});

export default compose(
    connect(state => ({
        formValues: getFormValues('order')(state),
    })),
    props,
)(Summary);
