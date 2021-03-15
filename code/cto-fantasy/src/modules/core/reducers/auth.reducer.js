import { LOGIN_AS_GUEST } from "../actions";

const initialState = {
  userType: null,
};

export const auth = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case LOGIN_AS_GUEST:
      return {
        ...state,
        userType: "guest",
      };
    default:
      return state;
  }
};
