import Axios from 'axios';
import {GET_ITEMS, ADD_ITEM, REMOVE_ITEM, ITEMS_LOADING} from './types.js';
import {tokenConfig} from './authActions';
import {returnErrors} from './errAction';

export const getItems = () => dispatch => {
  dispatch (setItemsLoading ());
  Axios.get ('/api/lists')
    .then (res =>
      dispatch ({
        type: GET_ITEMS,
        payload: res.data,
      })
    )
    .catch (err =>
      dispatch (returnErrors (err.response.data, err.response.status))
    );
};

export const addItem = item => (dispatch, getState) => {
  Axios.post ('/api/lists', item, tokenConfig(getState)).then (res =>
    dispatch ({
      type: ADD_ITEM,
      payload: res.data,
    }))
    .catch (err =>
      dispatch (returnErrors (err.response.data, err.response.status))
    );
};

export const deleteItem = id => (dispatch, getState) => {
  Axios.delete ('/api/lists/' + id, tokenConfig(getState)).then (res =>
    dispatch ({
      type: REMOVE_ITEM,
      payload: id,
    }))
    .catch (err =>
      dispatch (returnErrors (err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
