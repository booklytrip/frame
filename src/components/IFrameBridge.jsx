/**
 * The component provides communication with iFrame and
 * dispatch messages with events that happens inside the iFrame.
 * 
 * List of events that will be sent to the client:
 *  - Current location each time it changes
 *    { type: 'location', { pathname: '/a/new/path' } }
 * 
 * - Size of the window
 *    { type: 'resize', { height: <window height> } }
 */

import { compose, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import sizeMe from 'react-sizeme';

const DEBUG = true;

/**
 * Dispatch message event to target window
 * 
 * @param {String} type    - The message type
 * @param {String} message - The message itself 
 * @param {String} origin  - The target origin where the the event to be dispatched
 */
export const postMessage = (type, message, origin) => {
    const data = JSON.stringify({
        type,
        message,
    });

    window.parent.postMessage(data, origin);
};

/**
 * Return location object for provided URL
 */
const getLocation = url => {
    const el = document.createElement('a');
    el.href = url;

    return el;
};

const IFrameBridge = ({ history, children, size, project }) => {
    // Redirect to URL provided in project settings if host is different
    if (project) {
        // Check hostname of the host page
        const localURL =
            window.location !== window.parent.location
                ? document.referrer
                : document.location;

        const iframeURL = getLocation(localURL);
        const projectURL = getLocation(project.url);

        if (DEBUG) {
            console.log('Check host names', {
                iframe: iframeURL.hostname,
                project: projectURL.hostname,
            });
        }

        if (iframeURL.hostname !== projectURL.hostname) {
            let location = project.url;
            if (window.location.search.length > 1) {
                location += `&_bt=${iframeURL.pathname}`;
            } else {
                location += `?_bt=${iframeURL.pathname}`;
            }

            if (DEBUG) {
                console.log('Redirect to:', location);
            }
            window.location.replace(location);
        }
    }

    // Send location each time it changes
    history.listen(location => {
        postMessage('location', { pathname: location.pathname }, '*');
    });

    return children;
};

const handlers = withHandlers({
    onSize: ownProps => size => {
        postMessage('resize', { height: size.height }, '*');
    },
});

export default compose(
    handlers,
    sizeMe({
        monitorHeight: true,
        noPlaceholder: true,
        refreshMode: 'debounce',
    }),
    withRouter,
    connect(({ project }) => ({ project })),
)(IFrameBridge);
