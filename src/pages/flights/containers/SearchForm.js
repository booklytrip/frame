/**
 * @flow
 */
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm, getFormValues } from 'redux-form';

import { linkTo } from '../../../router';
import { pushSearchQuery } from '../../../actions/flights';
import { swapAirportOptions } from '../../../actions/search';
import { compose, withProps } from 'recompose';

import SearchForm from '../components/SearchForm.jsx';
import validate from '../../search/containers/searchFormValidate';

import type { Dispatch, SearchFlightQuery } from '../../../types';

// Initi form HOC component
const FormContainer = reduxForm({
    form: 'search',
    enableReinitialize: true,
    validate,
})(SearchForm);

const mapStateToProps = (state: Object) => ({
    formValues: getFormValues('search')(state) || {},
});

const mapDispatchToProps = (dispatch: Dispatch, { history }) => ({
    // Handle search request
    onSubmit: (query: SearchFlightQuery) => {
        // Save search query as latest searches
        dispatch(pushSearchQuery(query));

        // Redirect user to results page
        history.push(linkTo('/flights', query));
    },

    // Provide method to swap options
    swapAirportOptions: (field1: string, field2: string) => {
        dispatch(swapAirportOptions(field1, field2));
    },
});

// Fill props with initial values from current request
const props = ({ query }: { query: SearchFlightQuery }) => ({
    initialValues: query,
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withProps(props),
)(FormContainer);
