import React from 'react';
import { mountWithIntl, createWithIntl } from '../../../../../lib/jest/intl';
import FlightPrice from '../FlightPrice';

describe('FlightPrice', () => {
    it('renders without crashing', () => {
        mountWithIntl(
            <FlightPrice
                price={{
                    amount: 100,
                    currency: 'EUR',
                }}
            />,
        );
    });

    describe('Snapshots', () => {
        it('renders flight price', () => {
            const rendered = createWithIntl(
                <FlightPrice
                    price={{
                        amount: 100,
                        currency: 'EUR',
                    }}
                />,
            );
            expect(rendered.toJSON()).toMatchSnapshot();
        });
    });
});
