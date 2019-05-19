import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import { withRouter } from 'react-router';

import { linkTo } from '../../../router';

import { removeSearchQuery } from '../../../actions/flights';
import LastSearchItem from '../components/LastSearchItem.jsx';

const GET_AIRPORT_QUERY = gql`
    query getAirports (
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
        name(lang: $locale),
        code
        city {
            code
            name(lang: $locale)
        }
    }
`;

// Query server for additional airport information
const Container = graphql(GET_AIRPORT_QUERY, {
    options: ({ locale, query: { departureAirport, arrivalAirport } }) => ({
        variables: {
            departureAirport,
            arrivalAirport,
            locale,
        },
    }),
    props: ({ data: { loading, departureAirport, arrivalAirport } }) => ({
        loading,
        departureAirport,
        arrivalAirport,
    }),
})(LastSearchItem);

const mapDispatchToProps = (dispatch, { query, history }) => ({
    // Add callback to remove search query from the list
    onRemove: () => dispatch(removeSearchQuery(query)),
    onClick: () => {
        history.push(linkTo('/flights', query));
    },
});

export default compose(
    withRouter,
    connect(({ intl }) => ({ locale: intl.get('locale') }), mapDispatchToProps),
)(Container);
