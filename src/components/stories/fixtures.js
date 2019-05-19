export const airports = [
    {
        iata: '',
        icao: 'EBBX',
        name: 'Bertrix',
        city: 'Bertrix',
        country: 'Belgium',
        countryCode: 'BE',
    }, {
        iata: 'TMT',
        icao: 'SBTB',
        name: 'Trombetas',
        city: 'Oriximina',
        country: 'Brazil',
        countryCode: 'BR',
    }, {
        iata: 'AUA',
        icao: 'TNCA',
        name: 'Reina Beatrix Intl',
        city: 'Oranjestad',
        country: 'Aruba',
        countryCode: 'AW',
    },
];

export const menuItems = [
    { value: 1, title: 'First', label: 'Item 1' },
    { value: 2, title: 'Second', label: 'Item 2' },
    { value: 3, title: 'Third', label: 'Item 3' },
    { value: 4, title: 'Fourth', label: 'Item 4' },
    { value: 5, title: 'Fifth', label: 'Item 5' },
    { value: 6, title: 'Sixth', label: 'Item 6' },
    { value: 7, title: 'Seventh', label: 'Item 7' },
    { value: 8, title: 'Eight', label: 'Item 8' },
    { value: 9, title: 'Ninth', label: 'Item 9' },
    { value: 10, title: 'Tenth', label: 'Item 10' },
];

export const priceMatrix = {
    data: {
        '2016-08-05': {
            '2016-08-02': [
                300,
            ],
        },
        '2016-08-06': {
            '2016-08-01': [
                100,
            ],
        },
        '2016-08-07': {
            '2016-08-01': [
                200,
            ],
            '2016-08-02': [
                500,
            ],
        },
        '2016-08-08': {
            '2016-08-04': [
                400,
            ],
        },
        '2016-08-09': {
            '2016-08-03': [
                450,
            ],
        },
    },
    min: 100,
    max: 500,
    rows: ['2016-08-05', '2016-08-06', '2016-08-07', '2016-08-08', '2016-08-09'],
    columns: ['2016-08-01', '2016-08-02', '2016-08-03', '2016-08-04'],
};
// 
// 
// export const priceMatrix = [
//     {
//         column: '2016-08-01',
//         row: '2016-08-06',
//         value: 100,
//     },
//     {
//         column: '2016-08-01',
//         row: '2016-08-07',
//         value: 200,
//     },
//     {
//         column: '2016-08-02',
//         row: '2016-08-05',
//         value: 300,
//     },
//     {
//         column: '2016-08-04',
//         row: '2016-08-08',
//         value: 400,
//     },
//     {
//         column: '2016-08-03',
//         row: '2016-08-09',
//         value: 450,
//     },
//     {
//         column: '2016-08-02',
//         row: '2016-08-07',
//         value: 500,
//     },
// ];
