import {
    Map,
    Set,
    Stack,
} from 'immutable';
import { differenceInDays } from 'date-fns';
import { filter } from 'lodash';

import {
    saveState,
    loadState,
} from '../lib/localStorage';

// Number of search requests to store as latest searches
const MAX_SEARCH_QUERIES = 3;
// The default number of flights to show on the page
export const FLIGHTS_LIMIT_STEP = 10;

/**
 * Load latest search quries from local storage
 */
const loadLastSearchState = () => {
    // Filter outdated search quries
    const queries = filter(loadState('flights.lastSearch'), query => {
        const diff = differenceInDays(query.departureDate, new Date());
        return diff > 0;
    });

    saveState('flights.lastSearch', queries);

    return queries;
};

const initialState = new Map({
    filters: new Map({
        stops: new Set(),
        carriers: new Set(),
        flightDuration: new Map(),
        stopsDuration: null,
        nightStops: true,
    }),
    lastSearch: new Stack(loadLastSearchState()),
    limit: FLIGHTS_LIMIT_STEP,
});

export default function (state = initialState, action) {
    switch (action.type) {
        // Filter by number of stops
        case 'FLIGHTS.FILTER_STOPS': {
            return state.updateIn(['filters', 'stops'], stops => {
                if (action.enabled) {
                    return stops.add(action.stops)
                } else {
                    return stops.delete(action.stops)
                }
            });
        }
        // Replace stops filters with specified list
        case 'FLIGHTS.RESET_STOPS_FILTERS': {
            return state.setIn(['filters', 'stops'], new Set(action.stops));
        }
        // Filter by carrier
        case 'FLIGHTS.FILTER_CARRIER': {
            return state.updateIn(['filters', 'carriers'], carriers => {
                if (action.enabled) {
                    return carriers.add(action.carrier);
                } else {
                    return carriers.delete(action.carrier);
                }
            });
        }
        // Replace carrier filters with specified list
        case 'FLIGHTS.RESET_CARRIER_FILTERS': {
            return state.setIn(['filters', 'carriers'], new Set(action.carriers));
        }
        // Filter by flight duration
        case 'FLIGHTS.FILTER_FLIGHT_DURATION': {
            return state.setIn(['filters', 'flightDuration', action.name], action.duration);
        }
        // Filter by stops duration
        case 'FLIGHTS.FILTER_STOPS_DURATION': {
            return state.setIn(['filters', 'stopsDuration'], action.duration);
        }
        // Filter flights by stops that happens during night
        case 'FLIGHTS.FILTER_NIGHT_STOPS': {
            return state.setIn(['filters', 'nightStops'], action.enabled);
        }
        // Push search query to list of latest requests
        case 'FLIGHTS.PUSH_SEARCH_QUERY': {
            const newState = state.update('lastSearch', lastSearch => {
                const newLastSearch = lastSearch
                    // Filter query with same directions
                    .filter(({ departureAirport, arrivalAirport }) => (
                        departureAirport !== action.query.departureAirport ||
                        arrivalAirport !== action.query.arrivalAirport
                    ))
                    // Add a new query
                    .push(action.query)
                ;

                // Remove last query if stack has exceeded max size
                if (newLastSearch.size > MAX_SEARCH_QUERIES) {
                    return newLastSearch.skipLast(1);
                }

                return newLastSearch;
            });

            saveState('flights.lastSearch', newState.get('lastSearch'));

            return newState;
        }
        // Remove query from list of requests
        case 'FLIGHTS.REMOVE_SEARCH_QUERY': {
            const newState = state.update('lastSearch', lastSearch => (
                lastSearch.filterNot(item => item === action.query)
            ));

            saveState('flights.lastSearch', newState.get('lastSearch'));

            return newState;
        }
        // Set limit number of flights shown on the page
        case 'FLIGHTS.SHOW_MORE_FLIGHTS': {
            const nextLimit = action.leftFlights > FLIGHTS_LIMIT_STEP
                ? state.get('limit') + FLIGHTS_LIMIT_STEP
                : state.get('limit') + action.leftFlights;

            return state.set('limit', nextLimit);
        }
        default:
            return state;
    }
}
