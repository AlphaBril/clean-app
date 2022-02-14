const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const LOGOUT = "LOGOUT";

const initialState = {};

export interface AuthenticationType {
  isAuthenticated?: boolean;
  user: Promise<any>;
}

const authentication = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        user: payload,
      };
    case LOGIN_FAILURE:
      return {};
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default authentication;
