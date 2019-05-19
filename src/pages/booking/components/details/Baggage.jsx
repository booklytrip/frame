/**
 * @flow
 */

import React from 'react';
import { Field } from 'redux-form';
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { split, zipObject, map, some } from 'lodash';

import { Icon, Form, Select } from 'semantic-ui-react';
import { FormField } from 'uikit';
// import { Select } from '../../../../components';

import type { Airport, Sector, Price, Bag, Intl } from '../../../../types';

type BaggageSelectProps = {
    baggage: Array<Bag>,
    disabled: boolean,
    value?: Bag,
    onChange: Function,
    intl: Intl,
};

type BaggageFieldProps = {
    type: 'cabin' | 'checked',
    label: string,
    from: Airport,
    to: Airport,
    baggage: Array<Bag>,
    onChange: Function,
    value?: Bag,
};

type BaggageFieldsProps = {
    name: string,
    sector: Sector,
    intl: Intl,
};

const intlMessages = {
    BaggageSelect: defineMessages({
        default: {
            id: 'booking.details.BaggageSelect.default',
            defaultMessage: 'Travel without baggage',
        },
    }),
    BaggageField: {
        cabin: defineMessages({
            label: {
                id: 'booking.details.BaggageField.cabin.label',
                defaultMessage: 'Hand baggage',
            },
        }),
        checked: defineMessages({
            label: {
                id: 'booking.details.BaggageField.checked.label',
                defaultMessage: 'Checked baggage',
            },
        }),
    },
};

const BaggageIcon = styled(Icon)`
    color: ${props => (props.free ? '#7fba00' : '#fbbd08')}
`;

/**
 * Return label of selection for specified baggage
 *
 * @param {Float}  weight - Baggage weight
 * @param {Object} price  - Baggage price object
 */
const baggageSelectOptionText = ({
    weight,
    price,
    dimensions,
}: {
    weight: number,
    price: Price,
    dimensions: string,
}) =>
    <span>
        <FormattedMessage
            id="booking.details.Baggage.optionLabel.maxWeight"
            defaultMessage={`Max {weight}kg {dimensions}`}
            values={{ weight, dimensions }}
        />
        {' - '}
        {price.amount > 0
            ? `€ ${price.amount}`
            : <FormattedMessage
                  id="booking.details.Baggage.optionLabel.free"
                  defaultMessage="Free"
              />}
    </span>;

/**
 * Return value of selection for specified baggage
 */
const baggageSelectOptionValue = (bag: Bag) =>
    `${bag.price.amount}|${bag.weight}`;

/**
 * Normalize field value before storing result.
 * Split value on price and weight using "|" separator.
 *
 * @param {Object} field - Baggage form field
 */
const normalizeBaggageValue = value =>
    value && value !== 'none'
        ? zipObject(['price', 'weight'], split(value, '|'))
        : null;

/**
 * Convert stored baggage value to string prepresentation
 *
 * @param {Object} value - An object with price and weight of a baggage
 */
const formatBaggageValue = value =>
    value && value !== 'none' ? `${value.price}|${value.weight}` : null;

/**
 * Select component with list of baggage options
 *
 * @param {Array}    baggage  - List of baggage options
 * @param {Bool}     disabled - If true, the selection will be disabled
 * @param {String}   value    - Pre-defined value for selection
 * @param {Function} onChange - Trigger callback when value has changed
 */
const BaggageSelect = injectIntl(
    ({ baggage, disabled, value, onChange, intl }: BaggageSelectProps) => {
        const options = map(baggage, bag => ({
            value: baggageSelectOptionValue(bag),
            text: baggageSelectOptionText(bag),
        }));

        // Allow remove baggage if some options are not free
        if (some(baggage, i => i.price.amount !== 0)) {
            options.unshift({
                value: 'none',
                text: intl.formatMessage(intlMessages.BaggageSelect.default),
            });
        }

        return (
            <Select
                options={options}
                value={value || 'none'}
                disabled={disabled}
                onChange={onChange}
                normalize={value => (value === 'none' ? '' : value)}
            />
        );
    },
);

/**
 * Single field with label, icon and BaggageSelect
 *
 * @param {String} type       - Baggage type (cabin, checked)
 * @param {String} label      - Description of the baggae
 * @param {Object} from       - Departure airport
 * @param {Object} to         - Arrival airport
 * @param {String} value      - Selected value
 * @param {Array}  baggage    - List of baggage options
 * @param {Function} onChange - Trigger callback when value has changed
 */
const BaggageField = ({
    type,
    label,
    from,
    to,
    baggage,
    value,
    onChange,
}: BaggageFieldProps) => {
    // The free option is selected (value is in format "price|weight")
    const isFree = value && value[0] === '0';

    return (
        <Form.Field>
            <label>
                <BaggageIcon
                    name={type === 'cabin' ? 'travel' : 'suitcase'}
                    free={isFree}
                />
                {label} {from.city.name} - {to.city.name}
            </label>

            <BaggageSelect
                baggage={baggage}
                value={value}
                onChange={onChange}
            />
        </Form.Field>
    );
};

const fields = {
    baggage: FormField(BaggageField),
};

/**
 * Group of baggage fields, each for different type (cabin and checked)
 *
 * @param {Object} sector - A sector object holding airports and baggage details
 */
const BaggageFields = injectIntl(
    ({
        name,
        sector: { departureAirport, arrivalAirport, baggage },
        intl,
    }: BaggageFieldsProps) =>
        <Form.Group widths="equal">
            {baggage.cabin &&
                <Field
                    name={`${name}.cabin`}
                    component={fields.baggage}
                    from={departureAirport}
                    to={arrivalAirport}
                    baggage={baggage.cabin}
                    label={intl.formatMessage(
                        intlMessages.BaggageField.cabin.label,
                    )}
                    type="cabin"
                    format={formatBaggageValue}
                    normalize={normalizeBaggageValue}
                    simpleValue
                />}

            {baggage.checked &&
                <Field
                    name={`${name}.checked`}
                    component={FormField(BaggageField)}
                    from={departureAirport}
                    to={arrivalAirport}
                    baggage={baggage.checked}
                    label={intl.formatMessage(
                        intlMessages.BaggageField.checked.label,
                    )}
                    type="checked"
                    format={formatBaggageValue}
                    normalize={normalizeBaggageValue}
                    simpleValue
                />}
        </Form.Group>,
);

export { BaggageSelect, BaggageField, BaggageFields };
