import React from 'react';
// import renderer from 'react-test-renderer';
import { mountWithIntl } from '../../../../../lib/jest/intl';
import FlightDirection from '../FlightDirection';

import { oneWayFlight } from '../stories/fixtures';

describe('FlightDirection', () => {
    it('renders without crashing', () => {
        mountWithIntl(
            <FlightDirection
                sector={ oneWayFlight.forwardSector }
                type="outbound"
            />
        );
    });
});
