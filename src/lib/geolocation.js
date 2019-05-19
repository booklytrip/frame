/**
 * Returns current user position if it's available
 *
 * @return {Promise} - Object with user`s position
 */
const getCurrentPosition = () => (
    new Promise((resolve, reject) => {
        // Return undefined if geolocation is not available
        if (!('geolocation' in navigator)) {
            reject('Geolocation is not available');
        }

        navigator.geolocation.getCurrentPosition(
            position => resolve(position),
            error => resolve(error)
        );
    })
);

export {
    getCurrentPosition,
};
