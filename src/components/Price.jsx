/**
 * @flow
 */

import React from 'react';
import { split } from 'lodash';

import type { Price as PriceType } from '../types';

const styles = {
    price: {
        fontWeight: '600',
    },
    currency: {
        fontSize: '0.5em',
    },
    priceInt: {
        fontSize: '1em',
    },
    priceFraction: {
        position: 'relative',
        top: '-0.7em',
        fontSize: '0.5em',
    },
};

type PriceProps = {
    price: PriceType,
    fontSize?: string,
    className?: string,
    style?: Object,
};

const Price = ({ price, fontSize, className, style }: PriceProps) => {
    const amount = split(parseFloat(price.amount).toFixed(2).toString(), '.');
    return (
        <span
            className={className}
            style={{
                ...styles.price,
                ...style,
                fontSize,
            }}
        >
            <span style={styles.currency}>€</span>
            {' '}
            <span style={styles.priceInt}>{amount[0]}</span>
            <span style={styles.priceFraction}>{amount[1]}</span>
        </span>
    );
};

Price.defaultProps = {
    fontSize: '2em',
};

export default Price;
