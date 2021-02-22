import { createStore, applyMiddleware } from "redux";
import { rootEpic, rootReducer } from "./root";
import { compose } from "redux";
import { createEpicMiddleware } from 'redux-observable';


export const configureStore = () => {
  const epicMiddleware = createEpicMiddleware();
  const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, composer(
    applyMiddleware(epicMiddleware)
  ));

  epicMiddleware.run(rootEpic);
  return store;
};