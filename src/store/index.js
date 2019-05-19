import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import client from '../apollo-client';
import * as appReducers from '../reducers';

const middleware = applyMiddleware(
    client.middleware(),
    thunk.withExtraArgument(client),
);

const reducers = combineReducers({
    apollo: client.reducer(),
    form: formReducer,
    ...appReducers,
});

const store = createStore(
    reducers,
    compose(
        middleware,
        window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
);

export default store;
