import { createStore } from "redux";
const initialState = {
  username: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    default:
      return state;
  }
};
const store = createStore(reducer);

export default store;
