/**
 * @flow
 */

/**
 * Save the list of options for specified field name
 *
 * @param {String} field    - The field name
 * @param {Array}  options - A list of options to save
 */
export const saveAirportOptions = ({
    field,
    options,
}: {
    field: string,
    options: Array<Object>,
}) => ({
    type: 'SEARCH.SAVE_AIRPORT_OPTIONS',
    field,
    options,
});

/**
 * Swap list of options of two airports with specified field names.
 *
 * @param {String} field1 - First field name
 * @param {String} field2 - Second field name
 */
export const swapAirportOptions = (field1: string, field2: string) => ({
    type: 'SEARCH.SWAP_AIRPORT_OPTIONS',
    field1,
    field2,
});
