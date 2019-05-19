import React from 'react';
import { mountWithIntl } from '../../../../../lib/jest/intl';
import FlightArrivalDays from '../FlightArrivalDays';

describe('FlightArrivalDays', () => {
    it('renders without crashing', () => {
        mountWithIntl(
            <FlightArrivalDays
                departureTime="2017-01-01"
                arrivalTime="2017-01-10"
            />
        );
    });
});
