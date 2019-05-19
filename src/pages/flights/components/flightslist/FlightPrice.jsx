/**
 * @flow
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { withProps } from 'recompose';
import { split } from 'lodash';

type FlightPriceProps = {
    price: Array<number>,
    totalPrice: ?number,
    currency: string,
};

const RootSegment = styled.div`margin-top: 10px;`;

const PriceAmount = styled.div`
    font-size: 36px;
    font-weight: 600;
    display: inline-block;
    color: #e92133;
`;

const PriceDecimals = styled.sup`
    font-size: 16px;
    font-weight: 400;
    top: -16px;
`;

const Currency = styled.span`
    font-size: 18px;
    padding-right: 5px;
    font-weight: 400;
`;

const TotalPrice = styled.p`
    color: #636262;
    font-size: 13px;
    margin-top: 3px;
`;

const FlightPrice = ({ price, totalPrice, currency }: FlightPriceProps) => (
    <RootSegment>
        <PriceAmount>
            <Currency>€</Currency>
            {price[0]}
            <PriceDecimals>{price[1]}</PriceDecimals>
        </PriceAmount>

        {totalPrice && (
            <TotalPrice>
                <FormattedMessage
                    id="flights.flightslist.FlightPrice.total"
                    defaultMessage={`Total price: € {totalPrice}`}
                    values={{
                        totalPrice: parseFloat(totalPrice).toFixed(2),
                    }}
                />
            </TotalPrice>
        )}
    </RootSegment>
);

const props = withProps(ownProps => ({
    price: split(
        parseFloat(ownProps.price)
            .toFixed(2)
            .toString(),
        '.',
    ),
}));

export default props(FlightPrice);
