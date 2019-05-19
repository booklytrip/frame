/**
 * A form component which allow user to enter his personal
 * data required for flight checkin.
 *
 * The form opens as a modal windown
 *
 * @flow
 */

import React from 'react';
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { subYears, addYears } from 'date-fns';

import { Field } from 'redux-form';

import {
    Modal,
    Header,
    Input,
    Checkbox,
    Button,
    Icon,
    Form,
} from 'semantic-ui-react';
import { Calendar, FormField } from 'uikit';

import { Nationality, Country } from '../../../../../containers';

import type {
    ModalDialog,
    Passenger,
    Intl,
    ReduxForm,
} from '../../../../../types';

type CheckinFormProps = {
    passenger: Passenger,
    intl: Intl,
} & ModalDialog &
    ReduxForm;

const intlMessages = {
    nationality: defineMessages({
        label: {
            id: 'booking.service.tickets.CheckinForm.nationality.label',
            defaultMessage: 'Nationality',
        },
    }),
    birthDate: defineMessages({
        label: {
            id: 'booking.service.tickets.CheckinForm.birthDate.label',
            defaultMessage: 'Birth date',
        },
    }),
    documentType: {
        passport: defineMessages({
            label: {
                id:
                    'booking.service.tickets.CheckinForm.documentType.passport.label',
                defaultMessage: 'Passport',
            },
        }),
        identityCard: defineMessages({
            label: {
                id:
                    'booking.service.tickets.CheckinForm.documentType.identityCard.label',
                defaultMessage: 'Identity card',
            },
        }),
    },
    documentNumber: defineMessages({
        label: {
            id: 'booking.service.tickets.CheckinForm.documentNumber.label',
            defaultMessage: 'Number',
        },
    }),
    documentIssueCountry: defineMessages({
        label: {
            id:
                'booking.service.tickets.CheckinForm.documentIssueCountry.label',
            defaultMessage: 'Issue country',
        },
    }),
    documentIssueDate: defineMessages({
        label: {
            id: 'booking.service.tickets.CheckinForm.documentIssueDate.label',
            defaultMessage: 'Issue date',
        },
    }),
    documentExpirationDate: defineMessages({
        label: {
            id:
                'booking.service.tickets.CheckinForm.documentExpirationDate.label',
            defaultMessage: 'Expiriation date',
        },
    }),
    confirmation: defineMessages({
        label: {
            id: 'booking.service.tickets.CheckinForm.confirmation.label',
            defaultMessage:
                'I confirm that the filled data is valid and correct',
        },
    }),
};

/**
 * Represents checkbox component with defined label
 */
const ConfirmationCheckbox = injectIntl(({ intl, ...props }) => (
    <Checkbox
        label={intl.formatMessage(intlMessages.confirmation.label)}
        {...props}
    />
));

const fields = {
    nationality: FormField(Nationality),
    country: FormField(Country),
    calendar: FormField(<Calendar type="date" />),
    input: FormField(Input),
    confirmation: FormField(ConfirmationCheckbox),
};

const Subheader = styled(Header.Subheader)`text-transform: uppercase;`;

const CheckinForm = ({
    trigger,
    open,
    onClose,
    submitting,
    pristine,
    passenger,
    handleSubmit,
    intl,
}: CheckinFormProps) => (
    <Modal trigger={trigger} open={open} onClose={onClose}>
        <Header>
            {passenger.firstName} {passenger.lastName}
            <Subheader>{passenger.type}</Subheader>
        </Header>
        <Modal.Content>
            <Form onSubmit={handleSubmit}>
                <Header as="h4">
                    <FormattedMessage
                        id="booking.service.tickets.CheckinForm.headers.passenger"
                        defaultMessage="Passenger information"
                    />
                </Header>
                <Form.Group widths="equal">
                    <Field
                        name="nationality"
                        component={fields.nationality}
                        placeholder="Nationality"
                        label={intl.formatMessage(
                            intlMessages.nationality.label,
                        )}
                        simpleValue
                        search
                        required
                    />
                    <Field
                        name="birthDate"
                        component={fields.calendar}
                        type="date"
                        label={intl.formatMessage(intlMessages.birthDate.label)}
                        placeholder="Birth date"
                        minDate={subYears(new Date(), 150)}
                        maxDate={new Date()}
                        switchYearMonth
                        required
                    />
                </Form.Group>
                <Header as="h4">
                    <FormattedMessage
                        id="booking.service.tickets.CheckinForm.headers.document"
                        defaultMessage="Document information"
                    />
                </Header>
                <Form.Group inline>
                    <Field
                        name="documentType"
                        component={FormField(
                            <Checkbox
                                label={intl.formatMessage(
                                    intlMessages.documentType.passport.label,
                                )}
                                radio
                            />,
                        )}
                        value="PASSPORT"
                        type="radio"
                        simpleValue
                    />
                    <Field
                        name="documentType"
                        component={FormField(
                            <Checkbox
                                label={intl.formatMessage(
                                    intlMessages.documentType.identityCard
                                        .label,
                                )}
                                radio
                            />,
                        )}
                        value="IDENTITY_CARD"
                        type="radio"
                        simpleValue
                    />
                </Form.Group>
                <Form.Group widths="equal">
                    <Field
                        name="documentNumber"
                        component={fields.input}
                        label={intl.formatMessage(
                            intlMessages.documentNumber.label,
                        )}
                        placeholder="Document number"
                        simpleValue
                        required
                    />
                    <Field
                        name="documentIssueCountry"
                        component={fields.country}
                        label={intl.formatMessage(
                            intlMessages.documentIssueCountry.label,
                        )}
                        placeholder="Document issue country"
                        simpleValue
                        search
                        required
                    />
                </Form.Group>
                <Form.Group widths="equal">
                    <Field
                        name="documentIssueDate"
                        component={fields.calendar}
                        type="date"
                        firstDayOfWeek={1}
                        label={intl.formatMessage(
                            intlMessages.documentIssueDate.label,
                        )}
                        placeholder="Document issue date"
                        minDate={subYears(new Date(), 20)}
                        maxDate={new Date()}
                        switchYearMonth
                        required
                    />
                    <Field
                        name="documentExpirationDate"
                        component={fields.calendar}
                        type="date"
                        firstDayOfWeek={1}
                        label={intl.formatMessage(
                            intlMessages.documentExpirationDate.label,
                        )}
                        placeholder="Document expiration date"
                        minDate={new Date()}
                        maxDate={addYears(new Date(), 10)}
                        switchYearMonth
                        required
                    />
                </Form.Group>

                <Field
                    name="confirmed"
                    component={fields.confirmation}
                    type="checkbox"
                    required
                    simpleValue
                />
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button onClick={onClose} disabled={submitting}>
                <Icon className="remove" />
                <FormattedMessage
                    id="booking.service.tickets.CheckinForm.buttons.cancel"
                    defaultMessage="Cancel"
                />
            </Button>
            <Button
                onClick={handleSubmit}
                disabled={submitting || pristine}
                loading={submitting}
                primary
            >
                <Icon name="checkmark" />
                <FormattedMessage
                    id="booking.service.tickets.CheckinForm.buttons.confirm"
                    defaultMessage="Confirm"
                />
            </Button>
        </Modal.Actions>
    </Modal>
);

export default injectIntl(CheckinForm);
