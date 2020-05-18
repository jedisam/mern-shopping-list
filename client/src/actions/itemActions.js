import Axios from "axios";
import { GET_ITEMS, ADD_ITEM, REMOVE_ITEM, ITEMS_LOADING } from "./types.js.js";

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  Axios.get("/api/lists").then((res) =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    })
  );
};

export const addItem = (item) => (dispatch) => {
  Axios.post("/api/lists", item).then((res) =>
    dispatch({
      type: ADD_ITEM,
      payload: res.data,
    })
  );
};

export const deleteItem = (id) => (dispatch) => {
  Axios.delete("/api/lists/" + id).then((res) =>
    dispatch({
      type: REMOVE_ITEM,
      payload: id,
    })
  );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
