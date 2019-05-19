import React from 'react';
import { mountWithIntl, createWithIntl } from '../../../../lib/jest/intl';
import BookingSteps from '../BookingSteps';

describe('BookingSteps', () => {
    it('renders withut crashing', () => {
        mountWithIntl(<BookingSteps />);
    });

    describe('Snapshots', () => {
        it('renders with active step', () => {
            const rendered = createWithIntl(
                <BookingSteps active={ 2 } />
            );
            expect(rendered.toJSON()).toMatchSnapshot();
        });
    })
});
