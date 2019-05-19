/**
 * @flow
 */

import { connect } from 'react-redux';
import {
    compose,
    lifecycle,
    withState,
    withHandlers,
    withProps,
} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { injectIntl, defineMessages } from 'react-intl';
import {
    each,
    get,
    last,
    toLower,
    groupBy,
    property,
    isEmpty,
    find,
    isNull,
} from 'lodash';

import AirportSelect from '../components/Airport';

import type { Airport } from '../../../types';

const intlMessages = defineMessages({
    allAirports: {
        id: 'search.Airport.allAirports',
        defaultMessage: `{name} - All airports`,
    },
});

const GET_AIRPORTS_QUERY = gql`
    query searchAirports($term: String!, $locale: String!) {
        results: searchAirports(term: $term, limit: 10) {
            airport {
                iata
                icao
                name
                city {
                    code
                    name(lang: $locale)
                }
                country {
                    cca2
                    name(lang: $locale) {
                        common
                    }
                }
            }
        }
    }
`;

/**
 * Conver raw list of airports to format suitable for Select component
 *
 * @param {Array} airports - List of airports to re-format
 */
const mapAirports = (airports: Array<Airport>, intl) => {
    if (isEmpty(airports)) {
        return null;
    }

    // Group airports by city code
    const groupedAirports = groupBy(
        airports,
        property(['airport', 'city', 'code']),
    );

    const items = [];
    each(groupedAirports, (results, cityCode) => {
        // If there is more then one airport in same city, add the
        // city as a main group and all airports will be sub-grouped
        if (results.length > 1) {
            const airport = results[0].airport;
            items.push({
                value: airport.city.code,
                label: intl.formatMessage(intlMessages.allAirports, {
                    name: airport.city.name,
                }),
                countryCode: toLower(airport.country.cca2),
                cityCode: airport.city.code,
                name: airport.city.name,
                shift: false,
            });
        }

        each(results, result => {
            const airport = result.airport;

            // An airport will be sub-group if previous airport in the list
            // belongs to the same city
            const subGroup = airport.city.code === get(last(items), 'cityCode');

            // Format item label depending on position of the item in the list
            // and the number of total results presented to the user.
            let label = '';
            if (subGroup) {
                label = airport.name;
            } else {
                label = airport.name;
                if (airport.name !== airport.city.name) {
                    label += `, ${airport.city.name}`;
                }
            }

            items.push({
                label,
                value: airport.iata,
                countryCode: toLower(airport.country.cca2),
                cityCode: airport.city.code,
                iata: airport.iata,
                name: airport.name,
                // name: subGroup || airports.length === 1
                //     ? airport.name
                //     : airport.city.name,
                shift: subGroup,
            });
        });
    });

    return items;
};

const withData = graphql(GET_AIRPORTS_QUERY, {
    // Skip this query if search query is empty
    skip: ({ text, value }) => {
        if (text === value || text === '') {
            return true;
        }
        return false;
    },
    options: ({ text, value, locale }) => ({
        variables: {
            term: text || value,
            locale,
        },
    }),
    props: ({ ownProps, data: { results, loading } }) => ({
        results: mapAirports(results, ownProps.intl),
        loading,
    }),
});

/**
 * Provide cached results from redux-store and current locale
 */
const mapStateToProps = ({ intl, search }, ownProps) => ({
    locale: intl.get('locale'),
});

// Provide state state store field text
const textState = withState('text', 'setText', null);

// The component events handlers
const handlers = {
    // Save typed value in the local state and make search request.
    // Received result save in redux store.
    onSearchChange: ownProps => (e, value) => {
        // Do nothing if value has not changed
        if (ownProps.text === value) {
            return;
        }

        // Updae input text
        ownProps.setText(value);
    },

    // Update text with the name from selected destination and
    // pass the value to redux form.
    onResultSelect: ownProps => (e, { value, name }) => {
        ownProps.setText(name);
        ownProps.onChange(value);
    },

    // Automatically define input text if value match one of results
    autoSelectResult: ownProps => value => {
        const result = find(ownProps.results, { value });
        if (result) {
            ownProps.setText(result.name);
        }
    },

    // Select first result from the list when input lose focus
    // OR update text with value of result that matches
    onBlur: ownProps => () => {
        const { value, setText, results, onChange } = ownProps;
        if (!isEmpty(results)) {
            // Take first result if there is none that matches
            if (!value || !find(results, { value })) {
                setText(results[0].name);
                onChange(results[0].value);
            } else if (value) {
                const result = find(results, { value });
                setText(result.name);
            }
        }
    },
};

const componentWillReceiveProps = function(nextProps) {
    if (nextProps.text === '') {
        // Clear value if text is empty
        nextProps.onChange('');
    } else if (!nextProps.text && nextProps.value && nextProps.results) {
        // Try to select value for current text
        this.props.autoSelectResult(nextProps.value);
    } else if (nextProps.value !== this.props.value) {
        // If value has changed, reset text to default state
        nextProps.setText(null);
    }
};

// Pass text if it's defined or value otherways
const props = withProps(ownProps => ({
    text: !isNull(ownProps.text) ? ownProps.text : ownProps.value,
}));

export default compose(
    connect(mapStateToProps),
    textState,
    injectIntl,
    withData,
    withHandlers(handlers),
    lifecycle({ componentWillReceiveProps }),
    props,
)(AirportSelect);
