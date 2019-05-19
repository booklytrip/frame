/**
 * @flow
 */

import type { SearchFlightQuery } from '../types.js';

/**
 * Filter flights by specified number of stops
 *
 * @param {Number}  stops   - Number of stops
 * @param {Boolean} enabled - Enable OR disable filter
 */
export const filterStops = (stops: number, enabled: boolean) => ({
    type: 'FLIGHTS.FILTER_STOPS',
    stops,
    enabled,
});

/**
 * Replace current set of stops filters with a new specified list
 *
 * @param {Array} stops - The list of stops to filter
 */
export const resetStopsFilters = (stops: Array<number>) => ({
    type: 'FLIGHTS.RESET_STOPS_FILTERS',
    stops,
});

/**
 * Filter flights by specified carrier
 *
 * @param {String}  carrier - Carrier IATA code
 * @param {Boolean} enabled - Enable OR disable filter
 */
export const filterCarrier = (carrier: string, enabled: boolean) => ({
    type: 'FLIGHTS.FILTER_CARRIER',
    carrier,
    enabled,
});

/**
 * Replace current set of carrier filters with a new specified list
 *
 * @param {Array} carriers - The list of carriers to filter
 */
export const resetCarrierFilters = (carriers: Array<string>) => ({
    type: 'FLIGHTS.RESET_CARRIER_FILTERS',
    carriers,
});

/**
 * Filter flights by specified flight duration
 *
 * @param {Array}  duration - An array with min and max range values
 * @param {String} name     - Filter name (e.g. FORWARD, COMEBACK)
 */
export const filterFlightDuration = (duration: Array<number>, name: string) => ({
    type: 'FLIGHTS.FILTER_FLIGHT_DURATION',
    duration,
    name,
});

/**
 * Filter flights by specified stops duration
 *
 * @param {Array} duration - An array with min and max range values
 */
export const filterStopsDuration = (duration: Array<number>) => ({
    type: 'FLIGHTS.FILTER_STOPS_DURATION',
    duration,
});

/**
 * Filter flights that has a stop that happens at night
 *
 * @param {Boolean} enabled - Enable or disable filter
 */
export const filterNightStops = (enabled: boolean) => ({
    type: 'FLIGHTS.FILTER_NIGHT_STOPS',
    enabled,
});

/**
 * Push query to latest search requests
 *
 * @param {Object} query - Flight search query
 */
export const pushSearchQuery = (query: SearchFlightQuery) => ({
    type: 'FLIGHTS.PUSH_SEARCH_QUERY',
    query,
});

/**
 * Remove query from list of latest requests
 *
 * @param {Object} query - Query to remove
 */
export const removeSearchQuery = (query: SearchFlightQuery) => ({
    type: 'FLIGHTS.REMOVE_SEARCH_QUERY',
    query,
});

/**
 * Update limit number of flights to shown on the page
 *
 * @param {Number} leftFlights - Number of flights that are not shown yet
 */
export const showMoreFlights = (leftFlights: number) => ({
    type: 'FLIGHTS.SHOW_MORE_FLIGHTS',
    leftFlights,
});
