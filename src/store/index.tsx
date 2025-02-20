import {createStore, applyMiddleware, type Store} from 'redux';

import rootReducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

function configureStore(): Store {
  return createStoreWithMiddleware(rootReducer);
}

const store = configureStore();

export default store;
