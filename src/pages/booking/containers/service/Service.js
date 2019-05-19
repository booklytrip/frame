import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Service from '../../components/service/Service';

/**
 * Query flight details for specified booking
 */
const GET_BOOKING_QUERY = gql`
    query getBooking($id: ID!) {
        booking(id: $id) {
            id
            pnr
            flight(refresh: true) {
                ...flight
            }
            passengers {
                ...passenger
            }
            payment {
                ...payment
            }
            paymentMethods {
                ...paymentMethod
            }
            totalPrice {
                ...price
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
        nationality
        birthDate
        documentType
        documentNumber
        documentIssueCountry
        documentIssueDate
        documentExpirationDate
        forwardBaggage {
            ...baggage
        }
        comebackBaggage {
            ...baggage
        }
        checkin
    }

    fragment payment on Payment {
        price {
            ...price
        }
        transactionFee
        status
    }

    fragment paymentMethod on PaymentMethod {
        id
        name
        logo
        country
        group
        link
        transactionFee
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
})(Service);
