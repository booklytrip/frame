/**
 * @flow
 */
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import SearchFormFields from '../components/SearchFormFields';
import { swapAirportOptions } from '../../../actions/search';

import type { Dispatch } from '../../../types';

const mapStateToProps = state => ({
    formValues: getFormValues('search')(state) || {},
});

const mapDispatchToProps = (dispatch: Dispatch, { router }) => ({
    // Provide method to swap options
    swapAirportOptions: (field1, field2) => {
        dispatch(swapAirportOptions(field1, field2));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormFields);
