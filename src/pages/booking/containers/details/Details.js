import React from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { compose, branch, renderComponent, withProps } from 'recompose';
import { Redirect } from 'react-router-dom';

import Details from '../../components/details/Details.jsx';

// The query to get flight details by provided cacheID and priceKey
const GET_FLIGHT_DETAILS_QUERY = gql`
    query getFlight(
        $projectId: ID!
        $cachedID: ID!
        $priceKey: ID!
        $locale: String!
    ) {
        project(id: $projectId) {
            id
            flight(cachedID: $cachedID, priceKey: $priceKey) {
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
        carrier {
            name
            minAge
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
        stopDuration
        leftPlaces
        carrier {
            code
            name
        }
        flightNumber
    }

    fragment airport on Airport {
        code
        name
        city {
            code
            name(lang: $locale)
        }
        country {
            cca2
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
        dimensions
    }

    fragment price on Price {
        currency
        amount
    }
`;

const withData = graphql(GET_FLIGHT_DETAILS_QUERY, {
    options: ({ projectId, locale, match }) => ({
        variables: {
            projectId,
            cachedID: match.params.cachedID,
            priceKey: match.params.priceKey,
            locale,
        },
    }),
    props: ({ data: { loading, project, error } }) => ({
        loading,
        project,
        error,
    }),
});

// Redirect user to home page if there is an error
const withRedirect = branch(
    props => props.error,
    renderComponent(() => <Redirect to="/" />),
);

const mapStateToProps = ({ intl, project }) => ({
    locale: intl.get('locale'),
    projectId: project.id,
});

const props = withProps(
    ({ loading, project }) =>
        !loading && {
            flight: project.flight,
        },
);

export default compose(connect(mapStateToProps), withData, withRedirect, props)(
    Details,
);
