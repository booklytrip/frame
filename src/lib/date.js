/**
 * @flow
 */

/**
 * Convert duration to human readable format
 *
 * @param {Number} duration - A duration in number of seconds
 * @param {Object} options  - An additional options
 *
 * Options:
 *  magnitudes - Can limit magnitudes (e.g. ['h'] - use only hours)
 *  skip       - Skip magnitudes with empty values (true by default)
 *
 * Usage:
 *  humanizeDuration(20400, { magnitudes: ['h', 'm'] }) // 05h 40m
 */
export const humanizeDuration = (
    duration: number,
    options: {
        magnitudes?: Array<string>,
        skip?: boolean,
    } = {
        skip: true,
    }
) => {
    const magnitudes = {
        'd': 86400,
        'h': 3600,
        'm': 60,
        's': 1,
    };

    const result = [];

    let modulus = duration;
    Object.keys(magnitudes).forEach((magnitude) => {
        // Skip certain magnitudes not specified on options.magnitudes
        if (options.magnitudes !== undefined && options.magnitudes.indexOf(magnitude) === -1) {
            return;
        }

        const division = Math.floor(modulus / magnitudes[magnitude]);
        modulus %= magnitudes[magnitude];

        if (!options.skip || division > 0) {
            const formatedDivision = division < 10 ? `0${division}` : division;
            result.push(`${formatedDivision}${magnitude}`);
        }
    });

    return result.join(' ');
};
