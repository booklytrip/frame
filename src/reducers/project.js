/**
 * Storage for project settings
 */

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        // Return provided project as a new state
        case 'PROJECT.SAVE': {
            return action.project;
        }
        default: {
            return state;
        }
    }
};
