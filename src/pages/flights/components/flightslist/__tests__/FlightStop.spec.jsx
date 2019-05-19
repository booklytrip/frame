import React from 'react';
import { mountWithIntl } from '../../../../../lib/jest/intl';
import FlightStop from '../FlightStop';

import { oneWayFlight } from '../stories/fixtures';

describe('FlightStop', () => {
    it('renders without crashing', () => {
        mountWithIntl(
            <FlightStop
                segments={oneWayFlight.forwardSector.segments}
                segment={oneWayFlight.forwardSector.segments[0]}
            />,
        );
    });
});
