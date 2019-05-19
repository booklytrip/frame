import React from 'react';
import { createWithIntl } from '../../../../../lib/jest/intl';
import FlightLabels from '../FlightLabels';

const directFlight = {
    forwardSector: {
        stops: 0,
    },
};

describe('FlightLabels', () => {
    describe('Snapshots', () => {
        it('renders best flight label', () => {
            const rendered = createWithIntl(
                <FlightLabels best />
            );
            expect(rendered.toJSON()).toMatchSnapshot();
        });

        it('renders direct flight label', () => {
            const rendered = createWithIntl(
                <FlightLabels flight={ directFlight } />
            );
            expect(rendered.toJSON()).toMatchSnapshot();
        });
    })
});
