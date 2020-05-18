import {
  GET_ITEMS,
  ADD_ITEM,
  REMOVE_ITEM,
  ITEMS_LOADING,
} from "../actions/types.js";

const initialSate = {
  items: [],
  loading: false,
};

export default (state = initialSate, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payloads),
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
