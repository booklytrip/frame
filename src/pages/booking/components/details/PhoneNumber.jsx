/**
 * @flow
 */

import React from 'react';
import styled from 'styled-components';
import { injectIntl, defineMessages } from 'react-intl';

import BasePhoneCode from '../../containers/details/PhoneCode';

import type { Phone, Intl } from '../../../../types';

type PhoneNumberProps = {
    value: Phone,
    onChange: Function,
    onFocus: Function,
    onBlur: Function,
    intl: Intl,
};

const intlMessages = {
    countryCode: defineMessages({
        placeholder: {
            id: 'booking.details.PhoneNumber.countryCode.placeholder',
            defaultMessage: 'Select',
        },
    }),
    number: defineMessages({
        placeholder: {
            id: 'booking.details.PhoneNumber.number.placeholder',
            defaultMessage: 'Phone number',
        },
    }),
};

const PhoneCode = styled(BasePhoneCode)`
    &.active {
        border-radius: 0 0 0 .28571429rem !important;
    }
`;

const PhoneNumber = ({
    onChange,
    onFocus,
    onBlur,
    value,
    intl,
}: PhoneNumberProps) =>
    <div className="ui left action input">
        <PhoneCode
            placeholder={intl.formatMessage(
                intlMessages.countryCode.placeholder,
            )}
            value={value.countryCode}
            onChange={(e, data) =>
                onChange({
                    ...value,
                    countryCode: data.value,
                })}
            onBlur={() => onBlur(value)}
            onFocus={onFocus}
            button
            scrolling
            upward
        />
        <input
            type="text"
            placeholder={intl.formatMessage(intlMessages.number.placeholder)}
            value={value.number}
            onChange={e =>
                onChange({
                    ...value,
                    number: e.target.value,
                })}
            onBlur={() => onBlur(value)}
            onFocus={onFocus}
        />
    </div>;

export default injectIntl(PhoneNumber);
