/**
 * @flow
 */

import { connect } from 'react-redux';
import { graphql, gql } from 'react-apollo';
import { compose, withProps } from 'recompose';
import { filter, isNil } from 'lodash';

import { match as matchFlight } from '../../../lib/flight';
import FlightsResults from '../components/FlightsResults';

// The query to get list of flights for current project
const GET_FLIGHTS_QUERY = gql`
    query getFlights(
        $projectId: ID!
        $roundTrip: Boolean!
        $departureAirport: String!
        $arrivalAirport: String!
        $departureDate: String!
        $returnDate: String
        $adults: Int
        $children: Int
        $infants: Int
        $locale: String!
    ) {
        project(id: $projectId) {
            id
            flights(
                departureAirport: $departureAirport
                arrivalAirport: $arrivalAirport
                departureDate: $departureDate
                returnDate: $returnDate
                adults: $adults
                children: $children
                infants: $infants
            ) {
                general {
                    cachedID
                    priceKey
                    price {
                        currency
                        amount
                    }
                    pricing {
                        adult {
                            ...pricing
                        }
                        child {
                            ...pricing
                        }
                        infant {
                            ...pricing
                        }
                        avg
                    }
                }
                forwardSector {
                    ...sector
                }
                comebackSector @include(if: $roundTrip) {
                    ...sector
                }
            }
        }
    }

    fragment pricing on FlightPassengerPrice {
        total
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
        stopDuration
        nightStop
        leftPlaces
        carrier {
            code
            name
        }
        flightNumber
    }

    fragment airport on Airport {
        code
        name(lang: $locale)
        city {
            name(lang: $locale)
        }
    }
`;

const withData = graphql(GET_FLIGHTS_QUERY, {
    options: ({ query, locale, projectId }) => ({
        variables: {
            projectId,
            locale,
            ...query,
            roundTrip: !isNil(query.returnDate),
        },
    }),
    props: ({ data: { loading, project, error } }) => ({
        loading,
        project,
        hasError: error !== undefined,
    }),
});

/**
 * Applly filters and return list of filtered and raw flights
 */
const filterFlights = withProps(
    ({ loading, project, filters }) =>
        !loading && {
            rawFlights: project.flights,
            flights: filter(
                project.flights,
                flight => !matchFlight(flight, filters),
            ),
        },
);

/**
 * Provide current locale and specified set of filters
 */
const mapStateToProps = ({ intl, flights, project }) => ({
    projectId: project.id,
    locale: intl.get('locale'),
    filters: flights.get('filters').toJS(),
});

export default compose(connect(mapStateToProps), withData, filterFlights)(
    FlightsResults,
);
