import axios from 'axios';
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_ADD_REQUEST,
  CATEGORY_ADD_SUCCESS,
  CATEGORY_ADD_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
} from '../constants/categoryConstants';

export const listCategories = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/categories', config);

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_ADD_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/categories', category, config);

    dispatch({
      type: CATEGORY_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/categories/${category._id}`,
      category,
      config
    );

    dispatch({
      type: CATEGORY_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/categories/${id}`, config);

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
