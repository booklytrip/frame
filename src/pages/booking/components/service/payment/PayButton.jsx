/**
 * Represents booking payment button which triggers payment action
 * and has default and processing state
 *
 * @flow
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { darken } from 'polished';

import { Button as BaseButton, Loader, Icon } from 'semantic-ui-react';

type PayButtonProps = {
    disabled: boolean,
    processing: boolean,
    paymentMethod: Object,
    onClick: Function,
};

const Button = styled(BaseButton)`
    margin: 0 !important;
    background: ${({ theme }) =>
        theme.booking.service.payment.payButton.background} !important;
    color: ${({ theme }) =>
        theme.booking.service.payment.payButton.color} !important;

    &:hover {
        background: ${({ theme }) =>
            darken(
                0.2,
                theme.booking.service.payment.payButton.background,
            )} !important;        
    }
`;

const Spinner = styled(Loader)`
    margin-right: 14px !important;
`;

const PayButton = ({
    disabled,
    processing,
    paymentMethod,
    onClick,
}: PayButtonProps) =>
    <Button
        onClick={() => {
            onClick(paymentMethod);
        }}
        size="huge"
        float="right"
        labelPosition="right"
        disabled={disabled || processing}
        icon
    >
        <Icon name="chevron right" />

        {processing && <Spinner size="small" inline inverted active />}
        {!processing
            ? <FormattedMessage
                  id="booking.service.payment.PayButton.label"
                  defaultMessage="Pay now"
              />
            : <FormattedMessage
                  id="booking.service.payment.PayButton.redirecting"
                  defaultMessage="Redirecting to payment page"
              />}
    </Button>;

export default PayButton;
