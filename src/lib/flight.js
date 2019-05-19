/**
 * @flow
 */

import {
    chain,
    isNull,
    find,
    indexOf,
    each,
    isEmpty,
    sumBy,
    inRange,
    some,
    get,
} from 'lodash';

import type { Flight, FlightFilters, Segment } from '../types';

/**
 * Return total number of flights calculated based on all
 * segments of flight.
 *
 * @param {Array} forwardSegments - An array with group of forward segments
 * @param {Array} comebackSegments - An array with group of comeback segments
 */
export const leftSeats = ({
    forwardSegments,
    comebackSegments,
}: {
    forwardSegments?: Array<Segment>,
    comebackSegments?: Array<Segment>,
}) => {
    // The minimal number of seats, that will be not highlighted
    const MIN_FLIGHTS = 10;
    return chain([...(forwardSegments || []), ...(comebackSegments || [])])
        .map(
            segment =>
                isNull(segment.leftSeats)
                    ? MIN_FLIGHTS // Means that there are probably more
                    : segment.leftPlaces,
        )
        .min()
        .value();
};

/**
 * Return segment from list of segments following right after specified segment.
 *
 * The next segment will be considered the segment where departure airport is equal
 * to arrival airport of specified segment.
 *
 * @param {Array} segments - The list of segments
 * @param {Object} segment - The current segment
 */
export const nextSegment = ({
    segments,
    segment,
}: {
    segments: Array<Segment>,
    segment: Segment,
}) => {
    // If there one or non items in the list, there won't be result we are looking for
    if (segments.length < 2) {
        return undefined;
    }

    return find(
        segments,
        item => item.departureAirport.code === segment.arrivalAirport.code,
    );
};

/**
 * Return segment from list of segments following right before specified segment.
 *
 * The previous segment will be considered the segment where arrival airport is equal
 * to departure airport of specified segment.
 *
 * @param {Array} segments - The list of segments
 * @param {Object} segment - The current segment
 */
export const prevSegment = ({
    segments,
    segment,
}: {
    segments: Array<Segment>,
    segment: Segment,
}) => {
    // If there one or non items in the list, there won't be result we are looking for
    if (segments.length < 2) {
        return undefined;
    }

    return find(
        segments,
        item => item.arrivalAirport.code === segment.departureAirport.code,
    );
};

/**
 * Get all carriers for specified flight
 *
 * @param {Object} flight - Flight object
 */
export const getAllCarriers = (flight: Flight) => {
    const carriers = new Set();
    const allSegments = [
        ...get(flight, 'forwardSector.segments', []),
        ...get(flight, 'comebackSector.segments', []),
    ];

    each(allSegments, segment => {
        carriers.add(segment.carrier.code);
    });

    return carriers;
};

/**
 * Test filters on specified flight
 *
 * @param {Object} flight  - Flight object to test
 * @param {Object} filters - Set of filters to test
 */
export const match = (flight: Flight, filters: FlightFilters) => {
    // Filter by number of stops
    if (!isEmpty(filters.stops)) {
        if (indexOf(filters.stops, flight.forwardSector.stops) !== -1) {
            return true;
        }
    }

    // Filter by carriers
    if (!isEmpty(filters.carriers)) {
        const carriers = getAllCarriers(flight);
        for (const carrier of carriers) {
            if (indexOf(filters.carriers, carrier) !== -1) {
                return true;
            }
        }
    }

    // Filter by flight duration
    if (!isEmpty(filters.flightDuration['FORWARD'])) {
        const duration = filters.flightDuration['FORWARD'];
        if (
            !inRange(
                flight.forwardSector.duration,
                duration[0],
                duration[1] + 1,
            )
        ) {
            return true;
        }
    }
    if (!isEmpty(filters.flightDuration['COMEBACK'])) {
        const duration = filters.flightDuration['COMEBACK'];
        if (
            !inRange(
                flight.comebackSector.duration,
                duration[0],
                duration[1] + 1,
            )
        ) {
            return true;
        }
    }

    // Filter by stops duration
    if (!isEmpty(filters.stopsDuration)) {
        const forwardStopsDuration = sumBy(
            flight.forwardSector.segments,
            'stopDuration',
        );
        if (forwardStopsDuration > 0) {
            if (
                !inRange(
                    forwardStopsDuration,
                    filters.stopsDuration[0],
                    filters.stopsDuration[1] + 1,
                )
            ) {
                return true;
            }
        }

        if (!isEmpty(flight.comebackSector.segments)) {
            const comebackStopsDuration = sumBy(
                flight.comebackSector.segments,
                'stopDuration',
            );
            if (comebackStopsDuration > 0) {
                if (
                    !inRange(
                        comebackStopsDuration,
                        filters.stopsDuration[0],
                        filters.stopsDuration[1] + 1,
                    )
                ) {
                    return true;
                }
            }
        }
    }

    // Filter by night stops
    if (filters.nightStops === false) {
        const forwardSegments = some(
            get(flight, 'forwardSector.segments'),
            segment => segment.nightStop,
        );

        if (forwardSegments) {
            return true;
        }

        const comebackSegments = some(
            get(flight, 'comebackSector.segments'),
            segment => segment.nightStop,
        );

        if (comebackSegments) {
            return true;
        }
    }

    return false;
};
