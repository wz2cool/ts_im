import { Dispatch } from 'redux';
import actionTypes from '../actionTypes';
import { HttpService } from '../services';
import { UserFriendCategoryDto } from '../models/dto';

export const fetchUserCategoriesBegin = () => ({
  type: actionTypes.FETCH_USER_CATEGORY_BEGIN
});

export const fetchUserCategoriesSuccess = (userFriendCategories: UserFriendCategoryDto[]) => ({
  type: actionTypes.FETCH_USER_CATEGORY_SUCCESS,
  payload: { userFriendCategories }
});

export const fetchUserCategoriesError = (error: any) => ({
  type: actionTypes.FETCH_USER_CATEGORY_FAILURE,
  payload: { error }
});

export const fetchUserCategories = (userId: number) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchUserCategoriesBegin());
    return HttpService.getUserGroupCateogories(userId)
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        dispatch(fetchUserCategoriesSuccess(response.data));
        return response.data;
      })
      .catch(err => {
        dispatch(fetchUserCategoriesError(err));
      });
  };
}
