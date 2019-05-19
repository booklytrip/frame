import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ResultsHeader from '../components/ResultsHeader.jsx';

const GET_AIRPORT_QUERY = gql`
    query getAirport (
        $departureAirport: String!
        $arrivalAirport: String!
        $locale: String!
    ) {
        departureAirport: airport (iata: $departureAirport) {
            ...airport
        }
        arrivalAirport: airport (iata: $arrivalAirport) {
            ...airport
        }
    }

    fragment airport on Airport {
        code
        name(lang: $locale)
        city {
            name(lang: $locale)
        }
    }
`;

const GraphqlContainer = graphql(GET_AIRPORT_QUERY, {
    options: ownProps => ({
        variables: {
            departureAirport: ownProps.departureAirport,
            arrivalAirport: ownProps.arrivalAirport,
            locale: ownProps.locale,
        },
    }),
    props: ({
        ownProps,
        data: { loading, departureAirport, arrivalAirport },
    }) => ({
        loading,
        departureAirport: {
            code: ownProps.departureAirport,
            ...departureAirport,
        },
        arrivalAirport: {
            code: ownProps.arrivalAirport,
            ...arrivalAirport,
        },
    }),
})(ResultsHeader);

export default connect(({ intl }) => ({ locale: intl.get('locale') }))(
    GraphqlContainer,
);
