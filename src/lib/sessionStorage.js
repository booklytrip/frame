/**
 * Load state for specified key from session storage
 *
 * @param {String} key - State key name to load
 */
export const loadState = (key) => {
    try {
        const serializedState = sessionStorage.getItem(key);

        // If key is not defined, undefined
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
};

/**
 * Save state of specified key to session storage
 *
 * @param {String} key   - State key name to save
 * @param {Mix}    state - Serializable state to save in storage
 */
export const saveState = (key, state) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem(key, serializedState);
    } catch (error) {
        // Ignore write error
    }
};
