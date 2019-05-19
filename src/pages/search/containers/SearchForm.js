/**
 * @flow
 */
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

import { linkTo } from '../../../router';
import { pushSearchQuery } from '../../../actions/flights';
import { swapAirportOptions } from '../../../actions/search';

import SearchForm from '../components/SearchForm.jsx';
import validate from './searchFormValidate';

import type { Dispatch, SearchFlightQuery } from '../../../types';

// Initial form values
const initialValues = {
    adults: 1,
    children: 0,
    infants: 0,
};

const withReduxForm = reduxForm({
    form: 'search',
    touchOnBlur: false,
    initialValues,
    validate,
});

const mapStateToProps = state => {
    console.log('form', state.intl.get('locale'));
    return {
        formValues: getFormValues('search')(state) || {},
    };
};

const mapDispatchToProps = (dispatch: Dispatch, { history }) => ({
    // Handle search request
    onSubmit: (query: SearchFlightQuery) => {
        // Save search query as latest searches
        dispatch(pushSearchQuery(query));

        // Redirect user to results page
        history.push(linkTo('/flights', query));
    },

    // Provide method to swap options
    swapAirportOptions: (field1, field2) => {
        dispatch(swapAirportOptions(field1, field2));
    },
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withReduxForm,
)(SearchForm);
