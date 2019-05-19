import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { reduxForm } from 'redux-form';
import { compose, withProps } from 'recompose';
import { chain, map, range, each, set, get, find } from 'lodash';

import { startBooking, finishBooking } from '../../../../actions/booking';

import { linkTo } from '../../../../router';

import validate from './validate';
import DetailsForm from '../../components/details/DetailsForm.jsx';

import { PRIORITY_COUNTRIES } from './PhoneCode';

const withForm = reduxForm({
    form: 'order',
    validate,
});

/**
 * Normalizes submited form data to fit format required for submission
 */
const normalizeFormData = ({ passengers: originalPassengers, contact }) => {
    const passengers = chain(originalPassengers)
        .map((items, type) =>
            map(items, item => ({
                ...item,
                type: type.toUpperCase(),
            })),
        )
        .flatten()
        .value();

    return { passengers, contact };
};

const BOOK_FLIGHT_QUERY = gql`
    mutation createBooking($input: CreateBookingInput!) {
        createBooking(input: $input) {
            booking {
                id
            }
        }
    }
`;

const withData = graphql(BOOK_FLIGHT_QUERY, {
    props: ({
        mutate,
        ownProps: { flight, startBooking, finishBooking, history },
    }) => ({
        // Handle form submition by send booking details to the server
        // and in successful case redirect user to payment page
        onSubmit: data => {
            const { general: { cachedID, priceKey } } = flight;

            startBooking();

            const mutation = mutate({
                variables: {
                    input: {
                        cachedID: cachedID,
                        priceKey: priceKey,
                        ...normalizeFormData(data),
                    },
                },
            });

            return mutation
                .then(({ data }) => {
                    finishBooking();

                    // Redirect user to the payment page
                    history.push(
                        linkTo('/booking/service', {
                            id: data.createBooking.booking.id,
                        }),
                    );
                })
                .catch(() => {
                    finishBooking();
                });
        },
    }),
});

/**
 * Select free baggage option if avaiable for each direction
 * (e.g. foreward/comeback) and each passenger type (e.g. adult/child/infant).
 *
 * The result will be returned as initial values of booking form
 */
const props = ({ flight }) => {
    const initialValues = {
        contact: {
            phone: {
                countryCode: PRIORITY_COUNTRIES[0],
            },
        },
    };

    ['forward', 'comeback'].forEach(direction => {
        const baggage = get(flight, `${direction}Sector.baggage.cabin`);
        if (baggage) {
            const freeBaggage = find(baggage, i => i.price.amount === 0);
            if (freeBaggage) {
                each(flight.general.passengers, (count, type) => {
                    const passengerTypes = {
                        adults: 'ADULT',
                        children: 'CHILD',
                        infants: 'INFANT',
                    };

                    range(0, count).forEach(index => {
                        set(
                            initialValues,
                            `passengers.${passengerTypes[
                                type
                            ]}[${index}].${direction}Baggage.cabin`,
                            {
                                price: freeBaggage.price.amount,
                                weight: freeBaggage.weight,
                            },
                        );
                    });
                });
            }
        }
    });

    return { initialValues };
};

export default compose(
    withRouter,
    connect(null, { startBooking, finishBooking }),
    withData,
    withProps(props),
    withForm,
)(DetailsForm);
