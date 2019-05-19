import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { chain, find, remove } from 'lodash';
import { Dropdown } from 'semantic-ui-react';

// The list of countries that should appear at the top of the list
export const PRIORITY_COUNTRIES = ['LV', 'EE', 'LT', 'BY'];

// Query to get list of countries
const GET_COUNTRIES_QUERY = gql`
    query getCountries($lang: String!) {
        countries {
            cca2
            name(lang: $lang) {
                common
            }
            callingCode
        }
    }
`;

const withData = graphql(GET_COUNTRIES_QUERY, {
    options: ownProps => ({
        variables: {
            lang: ownProps.locale,
        },
    }),
    props: ({ data: { countries, loading } }) => ({
        loading,
        countries,
    }),
});

/**
 * Map countries to list phone codes
 */
const mapCountries = countries => {
    return chain(countries)
        .filter(country => country.callingCode[0] !== undefined)
        .map(country => ({
            text: `+${country.callingCode[0]}`,
            value: country.cca2,
            content: country.name.common,
        }))
        .value();
};

const withOptions = withProps(ownProps => {
    const options = mapCountries(ownProps.countries);

    // Get options with priority countries to push them to the top
    const priority = [];
    PRIORITY_COUNTRIES.forEach(country => {
        const option = find(options, { value: country });
        if (option) {
            priority.push(option);
            remove(options, option);
        }
    });

    return {
        options: [...priority, ...options],
    };
});

export default compose(
    connect(({ intl }) => ({
        locale: intl.get('locale'),
    })),
    withData,
    withOptions,
)(Dropdown);
