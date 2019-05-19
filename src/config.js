/**
 * System configuration
 */

const config = {
    // Common configuration for all types of environment
    common: {
        sentry: {
            url: 'https://<SECRET_KEY>@sentry.io/<ID>',
            sampleRate: 1, // Send 100% of events
        },
    },
    // Configuration per environment
    development: {
        rootUrl: 'http://192.168.50.10:3000',
        staticUrl: 'http://192.168.50.10:3001',
        graphqlServer: 'http://localhost:8080',
        thumborServer: 'http://localhost:8888',
        sentry: {
            sampleRate: 0, // Send 0% of events
        },
    },
    production: {
        rootUrl: 'http://frame.booklytrip.com',
        staticUrl: 'http://static.booklytrip.com',
        graphqlServer: 'http://graphql.booklytrip.com:8080',
        thumborServer: 'http://thumbor.booklytrip.com:8888',
    },
};

export default Object.assign({}, config.common, config[process.env.NODE_ENV]);
