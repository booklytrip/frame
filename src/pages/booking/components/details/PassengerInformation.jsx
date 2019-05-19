/**
 * @flow
 */

import React from 'react';
import styled from 'styled-components';
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import { upperFirst, has, map } from 'lodash';

import {
    Input,
    Icon,
    Message,
    Header,
    Form as BaseForm,
    Segment,
    Select,
} from 'semantic-ui-react';
import { FormField } from 'uikit';

import { BaggageFields } from './Baggage.jsx';

import type { Flight, PassengerType, Carrier, Intl } from '../../../../types';

type PassengerInformationProps = {
    flight: Flight,
    type: PassengerType,
    index: number,
    intl: Intl,
};

const intlMessages = {
    title: defineMessages({
        label: {
            id: 'booking.details.PassengerInformation.title.label',
            defaultMessage: 'Title',
        },
        placeholder: {
            id: 'booking.details.PassengerInformation.title.placeholder',
            defaultMessage: 'Select',
        },
        MR: {
            id: 'booking.details.PassengerInformation.title.MR',
            defaultMessage: 'Mr.',
        },
        MRS: {
            id: 'booking.details.PassengerInformation.title.MRS',
            defaultMessage: 'Mrs.',
        },
        MS: {
            id: 'booking.details.PassengerInformation.title.MS',
            defaultMessage: 'Ms.',
        },
    }),
    firstName: defineMessages({
        label: {
            id: 'booking.details.PassengerInformation.firstName.label',
            defaultMessage: 'First name',
        },
        placeholder: {
            id: 'booking.details.PassengerInformation.firstName.placeholder',
            defaultMessage: 'First Name',
        },
    }),
    lastName: defineMessages({
        label: {
            id: 'booking.details.PassengerInformation.lastName.label',
            defaultMessage: 'Last name',
        },
        placeholder: {
            id: 'booking.details.PassengerInformation.lastName.placeholder',
            defaultMessage: 'Last Name',
        },
    }),
};

const titles = [
    { value: 'MR', text: 'MR.' },
    { value: 'MRS', text: 'Mrs.' },
    { value: 'MS', text: 'Ms.' },
];

const fields = {
    title: FormField(Select),
    firstName: FormField(Input),
    lastName: FormField(Input),
};

const Form = styled(BaseForm)`
    &.ui.form .fields:last-child {
        margin-bottom: 0px !important;
    }
`;

const HeaderSegment = styled(Segment)`
    border-top-color: ${({ theme }) => theme.segment.borderTopColor} !important;
`;

/**
 * The minimal age that carrier allow to travel starting from from
 */
const CarrierAgeMessage = ({ carrier }: { carrier: Carrier }) =>
    <Message warning visible>
        <Icon name="info" />
        <FormattedMessage
            id="booking.details.CarrierAgeMessage"
            defaultMessage={`{carrier} allow to travel alone only starting from {minAge} years old and over.`}
            values={{
                carrier: carrier.name,
                minAge: carrier.minAge,
            }}
        />
    </Message>;

const PassengerInformation = injectIntl(
    ({ flight, type, index, intl }: PassengerInformationProps) =>
        <div className="passenger-information">
            <HeaderSegment attached="top">
                <Header>
                    <FormattedMessage
                        id="booking.details.PassengerInformation.header"
                        defaultMessage="Passenger"
                    />{' '}
                    {index} ({upperFirst(type)})
                </Header>
            </HeaderSegment>
            <Segment attached="bottom">
                {flight.forwardSector.carrier.minAge &&
                    <CarrierAgeMessage
                        carrier={flight.forwardSector.carrier}
                    />}
                <Form>
                    <BaseForm.Group>
                        <Field
                            name={`passengers.${type}[${index - 1}].title`}
                            label={intl.formatMessage(intlMessages.title.label)}
                            component={fields.title}
                            options={map(titles, title => ({
                                ...title,
                                text: intl.formatMessage(
                                    intlMessages.title[title.value],
                                ),
                            }))}
                            placeholder={intl.formatMessage(
                                intlMessages.title.placeholder,
                            )}
                            width={4}
                            fluid
                            simpleValue
                        />
                        <Field
                            name={`passengers.${type}[${index - 1}].firstName`}
                            label={intl.formatMessage(
                                intlMessages.firstName.label,
                            )}
                            component={fields.firstName}
                            type="text"
                            placeholder={intl.formatMessage(
                                intlMessages.firstName.label,
                            )}
                            width={6}
                            fluid
                            simpleValue
                        />
                        <Field
                            name={`passengers.${type}[${index - 1}].lastName`}
                            label={intl.formatMessage(
                                intlMessages.firstName.label,
                            )}
                            component={fields.lastName}
                            type="text"
                            placeholder={intl.formatMessage(
                                intlMessages.firstName.label,
                            )}
                            width={6}
                            fluid
                            simpleValue
                        />
                    </BaseForm.Group>

                    {(has(flight, 'forwardSector.baggage') ||
                        has(flight, 'comebackSector.baggage')) &&
                        <BaseForm.Field>
                            {has(flight, 'forwardSector.baggage') &&
                                <BaggageFields
                                    name={`passengers.${type}[${index -
                                        1}].forwardBaggage`}
                                    sector={flight.forwardSector}
                                />}

                            {has(flight, 'comebackSector.baggage') &&
                                <BaggageFields
                                    name={`passengers.${type}[${index -
                                        1}].comebackBaggage`}
                                    sector={flight.comebackSector}
                                />}
                        </BaseForm.Field>}
                </Form>
            </Segment>
        </div>,
);

export default PassengerInformation;
