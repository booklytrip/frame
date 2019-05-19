export const flight = {
    general: {
        wayType: 'ROUND_TRIP',
        passengers: {
            adults: 1,
            children: 0,
            infants: 0,
        },
    },
    forwardSector: {
        carrier: {
            name: 'Ryanair',
        },
        departureAirport: {
            city: {
                name: 'Riga',
            },
            name: 'Riga',
            code: 'RIX',
        },
        arrivalAirport: {
            city: {
                name: 'London',
            },
            name: 'London',
            code: 'LON',
        },
        baggage: {
            checked: [
                {
                    price: {
                        amount: '173.25',
                        currency: 'EUR',
                    },
                    weight: 15,
                },
            ],
        },
    },
    comebackSector: {
        departureAirport: {
            city: {
                name: 'London',
            },
            name: 'London',
            code: 'LON',
        },
        arrivalAirport: {
            city: {
                name: 'Riga',
            },
            name: 'Riga',
            code: 'RIX',
        },
        baggage: {
            checked: [
                {
                    price: {
                        amount: '173.25',
                        currency: 'EUR',
                    },
                    weight: 15,
                },
            ],
        },
    },
};
