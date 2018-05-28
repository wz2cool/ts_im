import * as lodash from 'lodash';

import { Dispatch } from 'redux';
import actionTypes from '../actionTypes';
import { HttpService } from '../services';
import { UserBaseInfoDto } from '../models/dto';

export const fetchUsersByFriendCategoryIdBegin = () => ({
  type: actionTypes.FETCH_USERS_BY_FRIEND_CATEGORY_ID_BEGIN
});

export const fetchUsersByFriendCategoryIdSuccess = (userBaseInfos: UserBaseInfoDto[]) => ({
  type: actionTypes.FETCH_USERS_BY_FRIEND_CATEGORY_ID_SUCCESS,
  payload: { userBaseInfos }
});

export const fetchUsersByFriendCategoryIdError = (error: any) => ({
  type: actionTypes.FETCH_USERS_BY_FRIEND_CATEGORY_ID_FAILURE,
  payload: { error }
});

export const fetchUsersByFriendCategoryId = (userFriendCategoryId: number) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchUsersByFriendCategoryIdBegin());
    return HttpService.getUsersByUserFriendCategoryId(userFriendCategoryId)
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        const result = lodash.map(response.data, x => {
          x.userFriendCategoryId = userFriendCategoryId;
          return x;
        });
        dispatch(fetchUsersByFriendCategoryIdSuccess(result));
        return result;
      })
      .catch(err => {
        dispatch(fetchUsersByFriendCategoryIdError(err));
      });
  };
};
