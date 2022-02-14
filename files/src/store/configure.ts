import { applyMiddleware, createStore } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

import reducer from "src/ducks/reducer";
import { MessageType } from "src/ducks/message/message";
import { AuthenticationType } from "src/ducks/authentication/authentication";

export const history = createBrowserHistory();

const composeEnhancers = (f: any) => f;

export interface RootState {
  message: MessageType;
  authentication: AuthenticationType;
}

const configure = () =>
  createStore(
    reducer(history),
    composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
  );

export default configure;
