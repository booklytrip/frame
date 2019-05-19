import React from 'react';
import { mountWithIntl, createWithIntl } from '../../../../../lib/jest/intl';
import FlightPriceBreakdown from '../FlightPriceBreakdown';

import { passengerPrice, passengerNumber } from '../stories/fixtures';

describe('FlightPriceBreakdown', () => {
    it('renders without crashing', () => {
        mountWithIntl(
            <FlightPriceBreakdown
                totalPrice={{
                    amount: 100,
                    currency: 'EUR',
                }}
                pricePerPassenger={{
                    amount: 20,
                    currency: 'EUR',
                }}
                passengerPrice={passengerPrice}
                passengerNumber={passengerNumber}
            />,
        );
    });

    describe('Snapshots', () => {
        it('renders price breakdown', () => {
            const rendered = createWithIntl(
                <FlightPriceBreakdown
                    totalPrice={{
                        amount: 100,
                        currency: 'EUR',
                    }}
                    pricePerPassenger={{
                        amount: 20,
                        currency: 'EUR',
                    }}
                    passengerPrice={passengerPrice}
                    passengerNumber={passengerNumber}
                />,
            );

            expect(rendered.toJSON()).toMatchSnapshot();
        });
    });
});
