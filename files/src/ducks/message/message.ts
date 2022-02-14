export const SET_MESSAGE = "SET_MESSAGE";
export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

const initialState = "";

export interface MessageType {
  message?: string;
  error: boolean;
}

export default function (state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload, error: false };

    case ERROR_MESSAGE:
      return { message: payload, error: true };

    case CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}
