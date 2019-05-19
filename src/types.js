/**
 * @flow
 */

// Definition of indentifier
export type ID = string;

// The list of supported locales (languages)
export type Locale = 'en' | 'lv' | 'ru';

export type Intl = {
    formatMessage: Function,
    formatDate: Function,
};

// Props provided by redux-form
export type ReduxForm = {
    pristine: boolean,
    dirty: boolean,
    submitting: boolean,
    handleSubmit: Function,
    reset: Function,
};

// Redux dispatcher
export type Dispatch = Function;

export type WayType = 'ONE_WAY' | 'ROUND_TRIP';

export type SearchFlightQuery = {
    wayType: WayType,
    departureAirport: string,
    arrivalAirport: string,
    departureDate: string,
    returnDate?: string,
    adults: number,
    children: number,
    infants: number,
};

export type Timezone = {
    name: string,
    offset: number,
};

export type Language = {
    code: string,
    name: string,
};

export type CountryName = {
    common: string,
    official: string,
};

export type Country = {
    name: CountryName,
    cca2: string,
    ccn3: string,
    cca3: string,
    currency: Array<string>,
    callingCode: Array<string>,
    capital: string,
    region: string,
    language: Array<Language>,
};

export type City = {
    id: ID,
    code: string,
    name: string,
    country: Country,
};

export type Airport = {
    name: string,
    city: City,
    country: Country,
    code: string,
    iata: string,
    icao: string,
    coordinates: Array<number>,
    timezone: Timezone,
};

export type Carrier = {
    code: string,
    name: string,
    minAge?: number,
};

export type Price = {
    amount: number,
    currency: string,
};

export type Bag = {
    price: Price,
    weight: number,
    dimensions: string,
};

export type Baggage = {
    checked: Bag,
    cabin: Bag,
};

export type Segment = {
    supplier: string,
    carrier: string,
    departureAirport: Airport,
    departureTime: string,
    arrivalAirport: Airport,
    arrivalTime: string,
    duration: number,
    stopDuration: number,
    nightStop: boolean,
    flightNumber: string,
    leftPlaces: number,
    carrier: Carrier,
    price: Price,
};

export type Sector = {
    carrier: Carrier,
    departureAirport: Airport,
    departureTime: string,
    arrivalAirport: Airport,
    arrivalTime: string,
    stops: number,
    duration: number,
    baggage: Baggage,
    segments: Array<FlightSegment>,
};

export type SectorType = 'outbound' | 'inbound';

export type PassengerType = 'ADULT' | 'CHILD' | 'INFANT';
export type PassengerTitle = 'MR' | 'MRS' | 'MS';

// TODO: Add description of passenger details object
export type PassengerDetails = Object;

export type CheckinStatus = 'PENDING' | 'CONFIRMED' | 'ERROR';

export type Passenger = {
    type: PassengerType,
    title: PassengerTitle,
    firstName: string,
    lastName: string,
    details: PassengerDetails,
    checkin: CheckinStatus,
};

export type FlightPassengerNumber = {
    adults: number,
    children: number,
    infants: number,
};

// Flight price for single person
export type FlightPassengerPrice = {
    total: number,
    tax: number,
    base: number,
};

// Price for each group of person
export type FlightPricing = {
    adult: FlightPassengerPrice,
    child?: FlightPassengerPrice,
    infant?: FlightPassengerPrice,
};

export type FlightGeneral = {
    cachedID: ID,
    priceKey: ID,
    wayType: WayType,
    departureDate: String,
    returnDate: String,
    passengers: FlightPassengerNumber,
    price: Price,
    pricing: FlightPricing,
};

export type FlightSegment = {
    departureAirport: Airport,
    departureTime: Object,
    arrivalAirport: Airport,
    arrivalTime: Object,
    duration: string,
    flightNumber: string,
    leftPlaces: number,
    carrier: Carrier,
    supplier: string,
    price: Price,
};

// TODO: Add description of flight object
export type Flight = {
    wayType: WayType,
    general: FlightGeneral,
    forwardSector: Sector,
    comebackSector: Sector,
};

// TODO: Add description of payment object
export type Payment = Object;

export type Booking = {
    id: ID,
    pnr: string,
    flight: Flight,
    passengers: Array<Passenger>,
    payment: Payment,
    createdAt: string,
};

export type PaymentMethod = {
    id: ID,
    name: string,
    image: string,
    group: string,
};

export type Phone = {
    countryCode: string,
    number: string,
};

// Set of filters for flights
export type FlightFilters = {
    stops: Array<number>,
    carriers: Array<string>,
    flightDuration: Object,
    stopsDuration: Array<number>,
    nightStops: boolean,
};

// Project settings
export type Project = {
    name: string,
};
