// configureStore.js
import { createStore } from 'redux';
import reducer from './reducers/reducer';

const configureStore = () => {
  const store = createStore(reducer);
  return store;
};

export default configureStore;
