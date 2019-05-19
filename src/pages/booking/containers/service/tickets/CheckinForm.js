// import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { compose, withProps } from 'recompose';
import { reduxForm } from 'redux-form';
import { omit, chain } from 'lodash';

import validate from './validate';
import CheckinForm from '../../../components/service/tickets/CheckinForm';

// The mutation to update passenger details
const CHECKIN_PASSENGER_QUERY = gql`
    mutation updatePassenger($input: UpdatePassengerInput!) {
        updatePassenger(input: $input) {
            passenger {
                id
                checkin
            }
        }
    }
`;

const withMutation = graphql(CHECKIN_PASSENGER_QUERY, {
    props: ({ mutate, ownProps }) => ({
        onSubmit: data => {
            const mutation = mutate({
                variables: {
                    input: {
                        passengerId: ownProps.passenger.id,
                        ...omit(data, ['confirmed']),
                    },
                },
            });

            return mutation.then(() => {
                ownProps.onClose();
            });
        },
    }),
});

// Init form initial values from passenger object
const withInitialValues = withProps(ownProps => ({
    initialValues: chain(ownProps.passenger)
        .omit([
            'id',
            'forwardBaggage',
            'comebackBaggage',
            'checkin',
            '__typename',
        ])
        .omitBy(i => i === null)
        .value(),
}));

// Init check-in form
const withForm = reduxForm({
    form: 'checkin',
    validate,
});

export default compose(withMutation, withInitialValues, withForm)(CheckinForm);
