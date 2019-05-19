import { defineMessages } from 'react-intl';
import { isEmpty, set } from 'lodash';

const intlMessages = {
    departureAirport: defineMessages({
        isEmpty: {
            id: 'search.form.departureAirport.isEmpty',
            defaultMessage: 'Enter departure place',
        },
    }),
    arrivalAirport: defineMessages({
        isEmpty: {
            id: 'search.form.arrivalAirport.isEmpty',
            defaultMessage: 'Enter arrival place',
        },
    }),
    departureDate: defineMessages({
        isEmpty: {
            id: 'search.form.departureDate.isEmpty',
            defaultMessage: 'Enter departure date',
        },
    }),
};

export default values => {
    const errors = {};

    // Validate departure and arrival airports
    if (isEmpty(values.departureAirport)) {
        set(errors, 'departureAirport', intlMessages.departureAirport.isEmpty);
    }
    if (isEmpty(values.arrivalAirport)) {
        set(errors, 'arrivalAirport', intlMessages.arrivalAirport.isEmpty);
    }

    // Validate departure date
    if (isEmpty(values.departureDate)) {
        set(errors, 'departureDate', intlMessages.departureDate.isEmpty);
    }

    return errors;
};
