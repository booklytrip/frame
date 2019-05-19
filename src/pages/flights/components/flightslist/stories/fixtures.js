import { merge } from 'lodash';

export const passengerPrice = {
    adult: {
        total: 110,
        tax: 10,
        base: 100,
    },
    child: {
        total: 55,
        tax: 5,
        base: 50,
    },
    infant: {
        total: 12,
        tax: 2,
        base: 10,
    },
    avg: 29.5,
};

export const passengerNumber = {
    adults: 1,
    children: 2,
    infants: 3,
};

export const oneWayFlight = {
    general: {
        currency: 'EUR',
        supplier: 'multiple_lc',
        price: {
            currency: 'EUR',
            amount: 191.67,
        },
        nightTransfer: true,
        pricing: passengerPrice,
        passengers: passengerNumber,
    },
    forwardSector: {
        departureAirport: {
            code: 'RIX',
            name: 'Rīga',
            city: {
                name: 'Riga',
            },
        },
        arrivalAirport: {
            code: 'LGW',
            name: 'Gatwick',
            city: {
                name: 'Gatwick',
            },
        },
        departureTime: '2016-08-23 13:15:00',
        arrivalTime: '2016-08-24 15:35:00',
        stops: 2,
        duration: '84000',
        segments: [
            {
                departureAirport: {
                    code: 'RIX',
                    name: 'Rīga',
                    city: {
                        name: 'Riga',
                    },
                },
                arrivalAirport: {
                    code: 'SXF',
                    name: 'Schoenefeld',
                    city: {
                        name: 'Berlin',
                    },
                },
                departureTime: '2016-08-23 13:15:00',
                arrivalTime: '2016-08-23 13:55:00',
                duration: '6000',
                stopDuration: null,
                flightNumber: 'FR2600',
                leftPlaces: 10,
                carrier: {
                    code: 'FR',
                    name: 'Ryanair',
                },
                supplier: 'ryanair',
            },
            {
                departureAirport: {
                    code: 'SXF',
                    name: 'Schoenefeld',
                    city: {
                        name: 'Berlin',
                    },
                },
                arrivalAirport: {
                    code: 'HHN',
                    name: 'Frankfurt',
                    city: {
                        name: 'Frankfurt',
                    },
                },
                departureTime: '2016-08-24 09:45:00',
                arrivalTime: '2016-08-24 10:35:00',
                duration: '6600',
                stopDuration: 3600,
                flightNumber: 'D82751',
                leftPlaces: null,
                carrier: {
                    code: 'DY',
                    name: 'Norwegian Air Shuttle',
                },
                supplier: 'norwegianair',
            },
            {
                departureAirport: {
                    code: 'HHN',
                    name: 'Frankfurt',
                    city: {
                        name: 'Frankfurt',
                    },
                },
                arrivalAirport: {
                    code: 'LGW',
                    name: 'Gatwick',
                    city: {
                        name: 'Gatwick',
                    },
                },
                departureTime: '2016-08-24 19:45:00',
                arrivalTime: '2016-08-25 00:35:00',
                duration: '6600',
                stopDuration: 7200,
                flightNumber: 'D82751',
                leftPlaces: null,
                carrier: {
                    code: 'DY',
                    name: 'Norwegian Air Shuttle',
                },
                supplier: 'norwegianair',
            },
        ],
    },
};

export const roundTripFlight = Object.assign({}, oneWayFlight, {
    comebackSegments: [
        {
            departureAirport: {
                code: 'LTN',
                name: 'Luton Airport',
                city: {
                    name: 'Luton',
                },
            },
            arrivalAirport: {
                code: 'RIX',
                name: 'Rīga',
                city: {
                    name: 'Riga',
                },
            },
            departureTime: '2016-08-28 19:45:00',
            arrivalTime: '2016-08-29 00:20:00',
            duration: '9300',
            stopDuration: null,
            flightNumber: 'W62504',
            leftPlaces: null,
            carrier: {
                code: 'W6',
                name: 'Wizz Air',
            },
            supplier: 'wizzair',
        },
    ],
    comebackSector: {
        departureAirport: {
            code: 'LTN',
            name: 'Luton Airport',
            city: {
                name: 'Luton',
            },
        },
        arrivalAirport: {
            code: 'RIX',
            name: 'Rīga',
            city: {
                name: 'Riga',
            },
        },
        departureTime: '2016-08-28 19:45:00',
        arrivalTime: '2016-08-29 00:20:00',
        stops: 0,
        duration: '9300',
    },
});

export const fewerSeatsFlight = merge({}, roundTripFlight, {
    forwardSector: {
        segments: [
            {
                leftPlaces: 2,
            },
        ],
    },
});
