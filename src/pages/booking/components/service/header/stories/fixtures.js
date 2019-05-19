export const booking = {
    pnr: 'BT123456',
    flight: {
        general: {
            wayType: 'ROUND_TRIP',
        },
        forwardSector: {
            departureAirport: {
                name: 'Riga',
                code: 'RIX',
            },
            arrivalAirport: {
                name: 'London',
                code: 'LON',
            },
        },
        comebackSector: {
            departureAirport: {
                name: 'London',
                code: 'LON',
            },
            arrivalAirport: {
                name: 'Riga',
                code: 'RIX',
            },
        },
    },
    passengers: [
        {
            type: 'ADULT',
            title: 'MR',
            firstName: 'John',
            lastName: 'Smith',
            forwardBaggage: {
                checked: {
                    price: 30,
                    weight: 15,
                },
            },
            checkin: 'CONFIRMED',
        },
        {
            type: 'ADULT',
            title: 'MS',
            firstName: 'Alexis',
            lastName: 'Smith',
            forwardBaggage: {
                checked: {
                    price: 30,
                    weight: 15,
                },
            },
            checkin: 'CONFIRMED',
        },
    ],
    payment: {
        status: 'success',
    },
    createdAt: 'Sun, 23 Oct 2016 23:56:50 GMT',
};
