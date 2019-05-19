/**
 * @flow
 */

import { Map } from 'immutable';
import { saveState, loadState } from '../lib/sessionStorage';

const initialState = new Map(loadState('intl') || {});

export default function(state: Object = initialState, action: Object) {
    switch (action.type) {
        // Replace current locale with specified
        case 'INTL.UPDATE_LOCALE': {
            const newState = state.set('locale', action.locale);
            saveState('intl', newState);
            return newState;
        }
        default:
            return state;
    }
}
