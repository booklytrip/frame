/**
 * @flow
 */

import React from 'react';
import { Field } from 'redux-form';
import { withHandlers } from 'recompose';
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl';
import { parse as parseDate } from 'date-fns';
import styled from 'styled-components';

import { Form } from 'semantic-ui-react';
import { FormComponent } from 'uikit';

import Calendar from './Calendar';
import Passengers from './Passengers';
import { Airport } from '../containers';

import type { SearchFlightQuery, Intl } from '../../../types';

type SearchFormFieldsProps = {
    formValues: SearchFlightQuery,
    swapAirports: Function,
    intl: Intl,
};

const intlMessages = {
    departureAirport: defineMessages({
        placeholder: {
            id: 'search.SearchForm.departureAirport.placeholder',
            defaultMessage: 'Departure place',
        },
        label: {
            id: 'search.SearchForm.departureAirport.label',
            defaultMessage: 'Departure place',
        },
    }),
    arrivalAirport: defineMessages({
        placeholder: {
            id: 'search.SearchForm.arrivalAirport.placeholder',
            defaultMessage: 'Arrival place',
        },
        label: {
            id: 'search.SearchForm.arrivalAirport.label',
            defaultMessage: 'Arrival place',
        },
    }),
    departureDate: defineMessages({
        placeholder: {
            id: 'search.SearchForm.departureDate.placeholder',
            defaultMessage: 'Depart at',
        },
        label: {
            id: 'search.SearchForm.departureDate.label',
            defaultMessage: 'Departure date',
        },
    }),
    returnDate: defineMessages({
        placeholder: {
            id: 'search.SearchForm.returnDate.placeholder',
            defaultMessage: 'One way',
        },
        label: {
            id: 'search.SearchForm.returnDate.label',
            defaultMessage: 'Return date',
        },
    }),
};

const FormGroup = styled(Form.Group)`
    margin: 0 !important;
`;

const FormField = styled(Form.Field)`
    padding-left: 1px !important;
    padding-right: 1px !important;
`;

const FieldLabel = styled.label`
    color: ${({ theme }) => theme.search.fieldLabel.color};
    opacity: 0;
    top: -23px;
    left: 18px;
    position: absolute;
    transition: transform .3s cubic-bezier(1, 0, 1, .4), opacity .3s linear;

    ${props =>
        props.active &&
        `
        opacity: 1 !important;
        transform: translate(0);
        transition: transform .3s cubic-bezier(0,.6,0,1),
                    opacity .3s linear;
    `};
`;

const ErrorMessageLabel = styled.div`
    display: block;
    position: absolute;
    left: 0px;
    right: 0px;
    top: -23px;
    padding: 2px 20px;
    background: #ef5d5d;
    color: #fff;
    font-size: .8125rem;
    z-index: 12;
    border-radius: 4px 4px 0px 0px;
`;

const FormFieldWrapperBase = styled.div`
    position: relative;
    ${props =>
        props.error &&
        `
        border-radius: 0 0 4px 4px;

        .Select-control {
            border-radius: 0 0 4px 4px !important;
            border-color: #ef5d5d !important;
        }

        .input input {
            border-radius: 0 0 4px 4px !important;
            border-color: #ef5d5d !important;
        }
    `};
`;

/**
 * Wrapp components and provide nice label that fly to the top
 * when component is active or filled.
 */
const FormFieldWrapper = component => field =>
    <FormFieldWrapperBase error={field.meta.touched && field.meta.error}>
        {field.meta.touched &&
            field.meta.error &&
            <ErrorMessageLabel>
                <FormattedMessage {...field.meta.error} />
            </ErrorMessageLabel>}

        {FormComponent(component)(field)}
        <FieldLabel active={field.meta.active || !!field.input.value}>
            {field.label}
        </FieldLabel>
    </FormFieldWrapperBase>;

const fields = {
    airport: FormFieldWrapper(Airport),
    calendar: FormFieldWrapper(Calendar),
};

const SearchFormFields = injectIntl(
    ({ formValues, swapAirports, intl }: SearchFormFieldsProps) =>
        <FormGroup>
            <FormField width={4}>
                <Field
                    component={fields.airport}
                    label={intl.formatMessage(
                        intlMessages.departureAirport.label,
                    )}
                    placeholder={intl.formatMessage(
                        intlMessages.departureAirport.placeholder,
                    )}
                    name="departureAirport"
                    onSwap={swapAirports}
                />
            </FormField>
            <FormField width={4}>
                <Field
                    component={fields.airport}
                    label={intl.formatMessage(
                        intlMessages.arrivalAirport.label,
                    )}
                    placeholder={intl.formatMessage(
                        intlMessages.arrivalAirport.placeholder,
                    )}
                    name="arrivalAirport"
                />
            </FormField>
            <FormField width={3}>
                <Field
                    component={fields.calendar}
                    label={intl.formatMessage(intlMessages.departureDate.label)}
                    name="departureDate"
                    type="date"
                    placeholder={intl.formatMessage(
                        intlMessages.departureDate.placeholder,
                    )}
                    firstDayOfWeek={1}
                    iconPosition="right"
                    fromDate={new Date()}
                    toDate={
                        formValues.returnDate
                            ? parseDate(formValues.returnDate)
                            : null
                    }
                    month={parseDate(
                        formValues.departureDate ||
                            formValues.returnDate ||
                            new Date(),
                    )}
                    selectedDays={[
                        formValues.departureDate,
                        formValues.returnDate,
                    ]}
                />
            </FormField>
            <FormField width={3}>
                <Field
                    component={fields.calendar}
                    label={intl.formatMessage(intlMessages.returnDate.label)}
                    name="returnDate"
                    type="date"
                    placeholder={intl.formatMessage(
                        intlMessages.returnDate.placeholder,
                    )}
                    firstDayOfWeek={1}
                    iconPosition="right"
                    fromDate={
                        formValues.departureDate
                            ? parseDate(formValues.departureDate)
                            : null
                    }
                    month={parseDate(
                        formValues.returnDate ||
                            formValues.departureDate ||
                            new Date(),
                    )}
                    selectedDays={[
                        formValues.departureDate,
                        formValues.returnDate,
                    ]}
                    clearable
                />
            </FormField>
            <FormField width={3}>
                <Passengers values={formValues} />
            </FormField>
        </FormGroup>,
);

export default withHandlers({
    // Swap values of departure and arrival airports
    swapAirports: props => () => {
        props.change('departureAirport', props.formValues.arrivalAirport || '');
        props.change('arrivalAirport', props.formValues.departureAirport || '');
    },
})(SearchFormFields);
