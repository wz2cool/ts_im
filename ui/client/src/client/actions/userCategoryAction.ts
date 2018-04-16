import { Dispatch } from 'redux';
import actionTypes from '../actionTypes';

export const fetchUserCategoryBegin = () => ({
  type: actionTypes.FETCH_USER_CATEGORY_BEGIN
});

export const fetchUserCategorySuccess = (userCategories) => ({
  type: actionTypes.FETCH_USER_CATEGORY_SUCCESS,
  payload: { userCategories }
});

export const fetchUserCategoryError = (error) => ({
  type: actionTypes.FETCH_USER_CATEGORY_FAILURE,
  payload: { error }
});

export function fetchUserCategory() {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchUserCategoryBegin());
    const userId = 1;
    const pageNum = 1;
    // take all
    const pageSize = 5000;
    const api = 'http://118.25.40.123:3002/ts_im_apis/userFriendCategory';
    const url = `${api}?userId=${userId}&pageNum=${pageNum}&pageSize=${pageSize}`;
    return fetch(url)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchUserCategorySuccess(json.))
      });
  };
}

function handleErrors(response: Response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}