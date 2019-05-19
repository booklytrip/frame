/**
 * @flow
 */

import type {
    Airport,
    FlightStopsFilter,
    FlightCarrierFilter,
} from '../../../../../../types';

export {
    oneWayFlight,
    roundTripFlight,
} from '../../../flightslist/stories/fixtures';

export const stops: Array<FlightStopsFilter> = [
    {
        price: 600,
        stops: 1,
        enabled: true,
    },
    {
        price: 1200,
        stops: 2,
        enabled: false,
    },
    {
        price: 1800,
        stops: 3,
        enabled: true,
    },
];

export const carriers: Array<FlightCarrierFilter> = [
    {
        price: 600,
        carrier: {
            code: 'FR',
            name: 'Ryanair',
        },
        enabled: true,
    },
    {
        price: 1200,
        carrier: {
            code: 'W6',
            name: 'Wizz Air',
        },
        enabled: false,
    },
];

export const departureAirport: Airport =  {
    code: 'SXF',
    name: 'Schoenefeld',
    city: {
        code: 'BER',
        name: 'Berlin',
    },
};

export const arrivalAirport: Airport = {
    code: 'HHN',
    name: 'Frankfurt',
    city: {
        code: 'FRA',
        name: 'Frankfurt',
    },
};

export const flightDirection = {
    loading: false,
    departureAirport,
    arrivalAirport,
    minDuration: 2400,
    maxDuration: 20400,
};

export const searchQuery = {
    departureAirport: 'RIX',
    arrivalAirport: 'LON',
    departureDate: '2017-04-01',
    returnDate: '2017-04-01',
    adults: 1,
    children: 0,
    infants: 0,
};
