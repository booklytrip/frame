import Raven from 'raven-js';
import config from '../config';

export const sentryURL = `https://${config.sentry.key}@app.getsentry.com/${config.sentry.app}`;

export function logException(ex, context) {
    Raven.captureException(ex, {
        extra: context,
    });

    /* eslint no-console: 0*/
    window && window.console && console.error && console.error(ex);
}
