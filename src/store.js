import { createStore, compose } from 'redux';
import rootReducer from './reducer';

const finalCreateStore = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)

const store = finalCreateStore(rootReducer);

export default store;