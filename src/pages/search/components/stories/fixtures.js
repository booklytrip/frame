export const airports = [
    {
        label: 'Bertrix',
        name: 'Bertrix',
        countryCode: 'BE',
        cityCode: 'BE',
    },
    {
        iata: 'TMT',
        label: 'Trombetas',
        name: 'Trombetas',
        countryCode: 'BR',
        cityCide: 'BR',
    },
    {
        iata: 'AUA',
        label: 'Reina Beatrix Intl',
        name: 'Reina Beatrix Intl',
        countryCode: 'AW',
        cityCide: 'AW',
    },
    {
        iata: 'QQS',
        label: 'St Pancras Railway Station',
        name: 'St Pancras Railway Station',
        countryCode: 'GB',
        cityCide: 'LON',
    },
];

export const oneWaySearchQuery = {
    type: 'ONE_WAY',
    departureAirport: {
        code: 'RIX',
        city: {
            name: 'Riga',
        },
    },
    arrivalAirport: {
        code: 'STN',
        city: {
            name: 'London',
        },
    },
    departureDate: '2016-01-09 15:45:03',
    returnDate: '',
    adultPassengers: 1,
    childPassengers: '',
    infantPassengers: '',
};

export const roundTripSearchQuery = {
    type: 'ROUND_TRIP',
    departureAirport: {
        code: 'VNO',
        city: {
            name: 'Vilnius',
        },
    },
    arrivalAirport: {
        code: 'STN',
        city: {
            name: 'London',
        },
    },
    departureDate: '2016-01-04 15:45:03',
    returnDate: '2016-01-28 13:05:00',
    adultPassengers: 1,
    childPassengers: 2,
    infantPassengers: '',
};

export const lastSearchQuries = [oneWaySearchQuery, roundTripSearchQuery];
