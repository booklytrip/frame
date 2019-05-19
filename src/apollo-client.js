import ApolloClient, { createNetworkInterface } from 'apollo-client';
import config from './config';

const networkInterface = createNetworkInterface({
    uri: `${config.graphqlServer}/graphql`,
});

networkInterface.use([
    {
        // Provide project ID with each request
        applyMiddleware(req, next) {
            const projectId = window.location.hostname.split('.')[0];

            req.options.headers = req.options.headers || {};
            req.options.headers['PROJECT_ID'] = projectId;

            next();
        },
    },
]);

const client = new ApolloClient({
    networkInterface,
    // Provide cache with unique object ID
    dataIdFromObject: o => o.id,
});

export default client;
