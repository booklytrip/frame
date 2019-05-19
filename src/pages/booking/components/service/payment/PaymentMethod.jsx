/**
 * @flow
 */

import React from 'react';
import { compose, withProps, branch, renderComponent } from 'recompose';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { filter, indexOf, find, isEmpty } from 'lodash';

import {
    Header as BaseHeader,
    Message,
    Divider,
    Segment,
} from 'semantic-ui-react';

import { PaymentMethodsList } from './PaymentMethodsList';
import PayButton from '../../../containers/service/payment/PayButton';

import type {
    PaymentMethod as PaymentMethodType,
    Intl,
} from '../../../../../types';

type PaymentMethodProps = {
    loading: boolean,
    paymentMethods: ?Array<PaymentMethodType>,
    internetBankingMethods: ?Array<PaymentMethodType>,
    bankCardMethods: ?Array<PaymentMethodType>,
    setPaymentMethod: Function,
    activePaymentMethod: ?PaymentMethodType,
    intl: Intl,
};

type PaymentMethodsSegmentProps = {
    methods: Array<PaymentMethodType>,
    setPaymentMethod: Function,
    activePaymentMethod: ?PaymentMethodType,
};

const PaymentMethodWrapper = styled(Segment)`
    & .ui.segment:first-child {
        padding-top: 0 !important;
    }
    & .ui.segment:last-child {
        padding-bottom: 0 !important;
    }
`;

const TransactionFee = styled.p`color: #de7c26;`;

const Header = styled(BaseHeader)`
    font-weight: 400;
`;

/**
 * Filter methods that belongs to specified group
 *
 * @param {Array} paymentMethods - A list of payment methods
 * @param {Array} groups         - A list of groups to filter
 */
const filterGroups = (paymentMethods, groups) => {
    return filter(paymentMethods, i => indexOf(groups, i.group) !== -1);
};

/**
 * Returns active payment object
 *
 * @param {Array}  paymentMethods      - A list of pyaments methods
 * @param {String} activePaymentMethod - An ID of active payment method
 */
const getPaymentMethod = (paymentMethods, activePaymentMethod) => {
    return (
        activePaymentMethod &&
        find(paymentMethods, {
            id: activePaymentMethod,
        })
    );
};

/**
 * Bank links and other internet payments
 */
const InternetBankingMethods = ({
    methods,
    setPaymentMethod,
    activePaymentMethod,
}: PaymentMethodsSegmentProps) =>
    <Segment basic vertical>
        <Header as="h4">
            <FormattedMessage
                id="booking.service.payment.InternetPaymentTab.headers.internet"
                defaultMessage="Internet banking"
            />
        </Header>

        <PaymentMethodsList
            paymentMethods={methods}
            onClick={setPaymentMethod}
            active={activePaymentMethod}
        />
    </Segment>;

const CreditCardMethods = ({
    methods,
    setPaymentMethod,
    activePaymentMethod,
}: PaymentMethodsSegmentProps) =>
    <Segment basic vertical>
        <Header as="h4">
            <FormattedMessage
                id="booking.service.payment.InternetPaymentTab.headers.cards"
                defaultMessage="Bank card (debit or credit card)"
            />
        </Header>

        <PaymentMethodsList
            paymentMethods={methods}
            onClick={setPaymentMethod}
            active={activePaymentMethod}
        />
    </Segment>;

/**
 * Represents list of selectable payment methods avaiable for user
 *
 * @param {Bool}     loading             - True if data is loading
 * @param {Array}    paymentMethods      - A list of payment methods
 * @param {Function} setPaymentMethod    - A function tiggered on payment method change
 * @param {String}   activePaymentMethod - A name of active payment method
 */
const PaymentMethod = ({
    loading,
    paymentMethods,
    internetBankingMethods,
    bankCardMethods,
    setPaymentMethod,
    activePaymentMethod,
}: PaymentMethodProps) =>
    <PaymentMethodWrapper>
        {!isEmpty(internetBankingMethods) &&
            <InternetBankingMethods
                methods={internetBankingMethods}
                setPaymentMethod={setPaymentMethod}
                activePaymentMethod={activePaymentMethod}
            />}

        {!isEmpty(bankCardMethods) &&
            <CreditCardMethods
                methods={bankCardMethods}
                setPaymentMethod={setPaymentMethod}
                activePaymentMethod={activePaymentMethod}
            />}

        <Segment vertical basic clearing>
            {activePaymentMethod &&
                <TransactionFee>
                    <FormattedMessage
                        id="booking.service.payment.InternetPaymentTab.transactionFee"
                        defaultMessage={`Additional transaction fee for your selected payment type is € {amount}`}
                        values={{
                            amount: find(paymentMethods, {
                                id: activePaymentMethod,
                            }).transactionFee.toFixed(2),
                        }}
                    />
                </TransactionFee>}

            <p>
                <FormattedMessage
                    id="booking.service.payment.InternetPaymentTab.instructions"
                    defaultMessage="After choosing one of the payment methods, press “Pay Now” and you will be redirected to the chosen online banking system. Follow banking system instructions."
                />
            </p>

            <Divider clearing />

            <PayButton
                paymentMethod={getPaymentMethod(
                    paymentMethods,
                    activePaymentMethod,
                )}
            />
        </Segment>
    </PaymentMethodWrapper>;

// Provide payment method groups
const props = withProps(ownProps => ({
    paymentMethods: ownProps.paymentMethods,
    internetBankingMethods: filterGroups(ownProps.paymentMethods, [
        'e-banking',
        'e-money',
    ]),
    bankCardMethods: filterGroups(ownProps.paymentMethods, ['credit-cards']),
}));

// Show message list of payment methods is empty
const withNoPaymentsMessage = branch(
    props => isEmpty(props.paymentMethods),
    renderComponent(() =>
        <Message warning>
            <FormattedMessage
                id="booking.service.payment.noPaymentsMessage"
                defaultMessage="No payment options are available"
            />
        </Message>,
    ),
);

export default compose(withNoPaymentsMessage, props)(PaymentMethod);
