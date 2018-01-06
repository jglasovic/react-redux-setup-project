import { applyMiddleware, createStore } from "redux";

import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./redux/reducers";
import rootSaga from "./redux/sagas";
import { routerMiddleware } from "react-router-redux";

export default function configureStore(initialState, history) {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [sagaMiddleware, routerMiddleware(history)].concat(
    __DEV__ ? createLogger() : []
  );

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );

  sagaMiddleware.run(rootSaga);

  if (__DEV__ && module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./redux/reducers", () => {
      const nextRootReducer = require("./redux/reducers").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
