import {trimEnd, isEmpty, isNil, chain, trim} from 'lodash';

/**
 * Build link that consist of path and parameters attached to path
 * in passed order.
 *
 * @param {String} path   - Base path
 * @param {Array}  params - A patameters to attach to the path
 */
const makeLink = (path, params) => {
    let fullLink = trimEnd(path, '/');

    if (!isEmpty(params)) {
        const paramsStr = chain(params)
            .filter(value => !isNil(value))
            .values()
            .join('/')
            .value();
        fullLink += `/${paramsStr}`;
    }

    return fullLink;
};

/**
 * Build a link for specified path and parameters
 *
 * @param {String} path   - A link path
 * @param {Object} params - Parameters to add to the link
 */
const linkTo = (path, params) => {
    switch (trim(path, '/')) {
        // List to flights results
        case 'flights':
            return makeLink(path, [
                params.wayType,
                params.departureAirport,
                params.arrivalAirport,
                params.departureDate,
                params.returnDate || undefined,
                params.adults,
                params.children,
                params.infants,
            ]);
        // Link to flight booking
        case 'booking/details':
            return makeLink(path, [params.cachedID, params.priceKey]);
        case 'booking/service':
            return makeLink(path, [params.id]);
        default:
            throw new Error(
                `Link with path ${path} is undefined, check router`,
            );
    }
};

export {makeLink, linkTo};
