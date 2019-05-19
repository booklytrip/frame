/**
 * Manage state of modal window
 * 
 * Usage:
 *   withModal(<ModalComponent />)
 * 
 * The ModalComponent will be provided with "open" state and
 * two events: onClose and onOpen to manage state.
 * 
 * @flow
 */

import { compose, withHandlers, withState } from 'recompose';

// Manage state of the modal window (oppened / closed)
const state = withState('open', 'setOpen', false);

const handlers = {
    // Close modal window
    onClose: ownProps => () => {
        ownProps.setOpen(false);
    },
    // Open modal window
    onOpen: ownProps => () => {
        ownProps.setOpen(true);
    },
};

export default compose(state, withHandlers(handlers));
