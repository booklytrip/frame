/**
 * @flow
 */

import React from 'react';
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { compose, branch, renderNothing } from 'recompose';
import { isEmpty } from 'lodash';

import { Header, Segment } from 'semantic-ui-react';
import FiltersGroup from './FiltersGroup';

import {
    StopsFilter,
    CarrierFilter,
    FlightDurationFilter,
    StopsDurationFilter,
    NightStopsFilter,
} from '../../../containers/sidebar/filters';

import type { Flight, SearchFlightQuery, Intl } from '../../../../../types';

type FiltersProps = {
    loading: boolean,
    flights: Array<Flight>,
    rawFlights: Array<Flight>,
    query: SearchFlightQuery,
    intl: Intl,
};

const intlMessages = {
    stops: defineMessages({
        title: {
            id: 'filters.sidebar.Filters.stops.title',
            defaultMessage: 'Stops',
        },
    }),
    carriers: defineMessages({
        title: {
            id: 'filters.sidebar.Filters.carriers.title',
            defaultMessage: 'Carriers',
        },
    }),
    flightQuality: defineMessages({
        title: {
            id: 'filters.sidebar.Filters.flightQuality.title',
            defaultMessage: 'Flight quality',
        },
    }),
};

const Groups = styled.div`
    margin-top: -1px;
`;

const Filters = injectIntl(({
    flights,
    rawFlights,
    query,
    intl,
}: FiltersProps) => (
    <div>
        <Segment attached="top">
            <Header as="h4">
                <FormattedMessage
                    id="flights.sidebar.Filters.header"
                    defaultMessage="Results filter"
                />

                <Header.Subheader>
                    <FormattedMessage
                        id="filters.sidebar.Filters.subheader"
                        defaultMessage={`{count} {count, plural,
                            =0 {no results}
                            one {result}
                            other {results}
                        }`}
                        values={{
                            count: !isEmpty(flights) ? flights.length : 0,
                        }}
                    />
                </Header.Subheader>
            </Header>
        </Segment>

        <Groups>
            <FiltersGroup title={intl.formatMessage(intlMessages.stops.title)}>
                <StopsFilter flights={rawFlights} />
            </FiltersGroup>

            <FlightDurationFilter
                flights={rawFlights}
                departureAirport={query.departureAirport}
                arrivalAirport={query.arrivalAirport}
            />

            <StopsDurationFilter flights={rawFlights} />

            <FiltersGroup
                title={intl.formatMessage(intlMessages.carriers.title)}
            >
                <CarrierFilter flights={rawFlights} />
            </FiltersGroup>

            <FiltersGroup
                title={intl.formatMessage(intlMessages.flightQuality.title)}
            >
                <NightStopsFilter flights={rawFlights} />
            </FiltersGroup>
        </Groups>
    </div>
));

// Show nothing if there are no results
const noResults = branch(props => isEmpty(props.rawFlights), renderNothing);

export default compose(noResults)(Filters);
