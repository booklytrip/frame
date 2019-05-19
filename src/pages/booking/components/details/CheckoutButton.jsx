/**
 * Represents booking checkout button which have default and processing state
 *
 * @flow
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { darken } from 'polished';

import { Loader, Icon, Button as BaseButton } from 'semantic-ui-react';

type CheckoutButtonProps = {
    onClick: Function,
    processing: boolean,
};

const Button = styled(BaseButton)`
    margin: 0 !important;
    background: ${({ theme }) =>
        theme.booking.details.checkoutButton.background} !important;
    color: ${({ theme }) =>
        theme.booking.details.checkoutButton.color} !important;
    
    &:hover {
        background: ${({ theme }) =>
            darken(
                0.2,
                theme.booking.details.checkoutButton.background,
            )} !important;
    }
`;

const Spinner = styled(Loader)`
    margin-right: 14px !important;
`;

const CheckoutButton = ({ onClick, processing }: CheckoutButtonProps) =>
    <Button
        disabled={processing}
        size="huge"
        labelPosition="right"
        onClick={onClick}
        icon
    >
        <Icon name="chevron right" />

        {processing && <Spinner size="small" inline inverted active />}
        {processing
            ? <FormattedMessage
                  id="booking.details.CheckoutButton.veryfing"
                  defaultMessage="Verifying price and availability"
              />
            : <FormattedMessage
                  id="booking.details.CheckoutButton.proceed"
                  defaultMessage="Proceed to checkout"
              />}
    </Button>;

export default CheckoutButton;
