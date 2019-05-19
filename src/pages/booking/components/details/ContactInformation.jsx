/**
 * @flow
 */

import React from 'react';
import { Field } from 'redux-form';
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Input, Form as BaseForm, Segment, Header } from 'semantic-ui-react';
import { FormField } from 'uikit';

import PhoneNumber from './PhoneNumber.jsx';

import type { Intl } from '../../../../types';

const intlMessages = {
    fullName: defineMessages({
        placeholder: {
            id: 'booking.details.ContactInformation.fullName.placeholder',
            defaultMessage: 'Full name',
        },
    }),
    email: defineMessages({
        placeholder: {
            id: 'booking.details.ContactInformation.email.placeholder',
            defaultMessage: 'Email address',
        },
    }),
};

const Form = styled(BaseForm)`
    &.ui.form .fields:last-child {
        margin-bottom: 0px !important;
    }
`;

const HeaderSegment = styled(Segment)`
    border-top-color: ${({ theme }) => theme.segment.borderTopColor} !important;
`;

const fields = {
    fullName: FormField(Input),
    email: FormField(Input),
    phoneNumber: FormField(PhoneNumber),
};

const ContactInformation = injectIntl(({ intl }: { intl: Intl }) =>
    <div className="contact-information">
        <HeaderSegment attached="top">
            <Header as="div">
                <FormattedMessage
                    id="booking.details.ContactInformation.header"
                    defaultMessage="Contact Information"
                />
            </Header>
        </HeaderSegment>
        <Segment attached="bottom">
            <Form as="div">
                <BaseForm.Group>
                    <BaseForm.Field width={5}>
                        <label>
                            <FormattedMessage
                                id="booking.details.ContactInformation.fullName.label"
                                defaultMessage="Name"
                            />
                        </label>
                        <Field
                            name="contact.fullName"
                            component={fields.fullName}
                            type="text"
                            placeholder={intl.formatMessage(
                                intlMessages.fullName.placeholder,
                            )}
                            fluid
                            simpleValue
                        />
                    </BaseForm.Field>
                    <BaseForm.Field width={5}>
                        <label>
                            <FormattedMessage
                                id="booking.details.ContactInformation.email.label"
                                defaultMessage="Email address"
                            />
                        </label>
                        <Field
                            name="contact.email"
                            component={fields.email}
                            type="text"
                            placeholder={intl.formatMessage(
                                intlMessages.email.placeholder,
                            )}
                            fluid
                            simpleValue
                        />
                    </BaseForm.Field>
                    <BaseForm.Field width={6}>
                        <label>
                            <FormattedMessage
                                id="booking.details.ContactInformation.phone.label"
                                defaultMessage="Phone number"
                            />
                        </label>
                        <Field
                            name="contact.phone"
                            component={fields.phoneNumber}
                            fluid
                            simpleValue
                        />
                    </BaseForm.Field>
                </BaseForm.Group>
            </Form>
        </Segment>
    </div>,
);

export default ContactInformation;
