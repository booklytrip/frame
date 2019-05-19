/**
 * @flow
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { List, Segment } from 'semantic-ui-react';
import { get, isNil } from 'lodash';

import Subheader from './Subheader';

type SummaryPricingProps = {
    prices: Object,
};

const SummaryPricing = ({ prices }: SummaryPricingProps) => (
    <Segment attached>
        <Subheader as="h4">
            <FormattedMessage
                id="booking.summary.SummaryPricing.header"
                defaultMessage="Pricing"
            />
        </Subheader>
        <List size="small">
            <List.Item>
                <List.Content floated="right">
                    &euro; {prices.flight.amount.toFixed(2)}
                </List.Content>
                <FormattedMessage
                    id="booking.summary.SummaryPricing.flightPrice"
                    defaultMessage="Flight price"
                />
            </List.Item>
            {!isNil(get(prices, 'baggage.cabin')) && (
                <List.Item>
                    <List.Content floated="right">
                        &euro; {prices.baggage.cabin.amount.toFixed(2)}
                    </List.Content>
                    <FormattedMessage
                        id="booking.summary.SummaryPricing.cabinBaggage"
                        defaultMessage="Cabin baggage"
                    />
                </List.Item>
            )}
            {!isNil(get(prices, 'baggage.checked')) && (
                <List.Item>
                    <List.Content floated="right">
                        &euro; {prices.baggage.checked.amount.toFixed(2)}
                    </List.Content>
                    <FormattedMessage
                        id="booking.summary.SummaryPricing.checkedBaggage"
                        defaultMessage="Checked baggage"
                    />
                </List.Item>
            )}
            {prices.transactionFee > 0 && (
                <List.Item>
                    <List.Content floated="right">
                        &euro; {prices.transactionFee.amount.toFixed(2)}
                    </List.Content>
                    <FormattedMessage
                        id="booking.summary.SummaryPricing.transactionFee"
                        defaultMessage="Transaction fee"
                    />
                </List.Item>
            )}
        </List>
    </Segment>
);

export default SummaryPricing;
