import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import TicketPage from '../components/TicketPage';

/**
 * Query flight details for specified booking
 */
const GET_BOOKING_QUERY = gql`
    query getBooking($id: ID!) {
        booking(id: $id) {
            id
            pnr
            flight {
                ...flight
            }
            passengers {
                ...passenger
            }
            createdAt
        }
    }

    fragment flight on Flight {
        general {
            cachedID
            priceKey
            wayType
            departureDate
            returnDate
            price {
                ...price
            }
            passengers {
                adults
                children
                infants
            }
        }
        forwardSector {
            ...sector
        }
        comebackSector {
            ...sector
        }
    }

    fragment sector on FlightSector {
        departureAirport {
            ...airport
        }
        arrivalAirport {
            ...airport
        }
        departureTime
        arrivalTime
        stops
        duration
        baggage {
            ...baggage
        }
        segments {
            ...segment
        }
    }

    fragment segment on FlightSegment {
        departureAirport {
            ...airport
        }
        arrivalAirport {
            ...airport
        }
        departureTime
        arrivalTime
        duration
        leftPlaces
        carrier {
            code
            name
        }
        flightNumber
    }

    fragment airport on Airport {
        id
        code
        name
        city {
            code
            name
        }
    }

    fragment baggage on Baggage {
        cabin {
            ...bag
        }
        checked {
            ...bag
        }
    }

    fragment bag on Bag {
        price {
            ...price
        }
        weight
    }

    fragment price on Price {
        currency
        amount
    }

    fragment passenger on Passenger {
        id
        type
        title
        firstName
        lastName
        forwardBaggage {
            ...baggage
        }
        comebackBaggage {
            ...baggage
        }
        checkin
    }
`;

export default graphql(GET_BOOKING_QUERY, {
    options: ({ match }) => ({
        variables: {
            id: match.params.bookingId,
        },
        fetchPolicy: 'network-only',
    }),
    props: ({ data, data: { loading, booking, error } }) => ({
        loading,
        booking,
        error,
    }),
})(TicketPage);
