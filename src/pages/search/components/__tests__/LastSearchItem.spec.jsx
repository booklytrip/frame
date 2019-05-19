import React from 'react';
import { mountWithIntl, createWithIntl } from '../../../../lib/jest/intl';
import LastSearchItem from '../LastSearchItem';

import type { Airport, SearchFlightQuery } from '../../../../types';

const departureAirport: Airport = {
    name: 'Riga Int. Airport',
    city: {
        name: 'Riga',
    },
};

const arrivalAirport: Airport = {
    name: 'Stansted Airport',
    city: {
        name: 'Stansted',
    },
};

const oneWaySearchQuery: SearchFlightQuery = {
    departureDate: '2017-04-19',
    returnDate: '2017-04-25',
};

const roundTripSearchQuery: SearchFlightQuery = {
    departureDate: '2017-04-19',
    returnDate: '2017-04-25',
};

describe('LastSearchItem', () => {
    it('renders without crashing', () => {
        mountWithIntl(
            <LastSearchItem
                query={roundTripSearchQuery}
                departureAirport={departureAirport}
                arrivalAirport={arrivalAirport}
            />,
        );
    });

    it('should call onClick event if clicked', () => {
        const spy = jest.fn();
        const searchItem = mountWithIntl(
            <LastSearchItem
                query={roundTripSearchQuery}
                departureAirport={departureAirport}
                arrivalAirport={arrivalAirport}
                onClick={spy}
            />,
        );
        searchItem.simulate('click');

        expect(spy).toBeCalled();
    });

    it('should call onRemove event if remove button is clicked', () => {
        const spy = jest.fn();
        const searchItem = mountWithIntl(
            <LastSearchItem
                query={roundTripSearchQuery}
                departureAirport={departureAirport}
                arrivalAirport={arrivalAirport}
                onRemove={spy}
            />,
        );
        searchItem.find('.delete.label').simulate('click');

        expect(spy).toBeCalled();
    });
});
