/**
 * @flow
 */

import { Map } from 'immutable';

const initialState = new Map({
    airports: new Map(),
});

export default function (state: Object = initialState, action: Object) {
    switch (action.type) {
        // Save list of airport options for specified field name
        case 'SEARCH.SAVE_AIRPORT_OPTIONS':
            return state.setIn(['airports', action.field], action.options);
        // Swap two airport options with specified field names
        case 'SEARCH.SWAP_AIRPORT_OPTIONS':
            return state.withMutations(map => {
                const a = map.getIn(['airports', action.field1]);
                const b = map.getIn(['airports', action.field2]);

                map
                    .setIn(['airports', action.field1], b)
                    .setIn(['airports', action.field2], a)
                ;
            });
        default:
            return state;
    }
}
