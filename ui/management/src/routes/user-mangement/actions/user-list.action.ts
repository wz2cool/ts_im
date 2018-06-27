import { ActionPayload } from "../../../models/interface";
import { UserInfoPageDto, UserFilterDto } from "../../../models/dto";
import { Dispatch } from "redux";
import { UserHttpService } from "../../../services";
import * as lodash from "lodash";

export const FETCH_USER_INFO_PAGE_BEGIN = "FETCH_USER_INFO_PAGE_BEGIN";
export const FETCH_USER_INFO_PAGE_SUCCESS = "FETCH_USER_INFO_PAGE_SUCCESS";
export const FETCH_USER_INFO_PAGE_FAILED = "FETCH_USER_INFO_PAGE_FAILED";
export const PAGE_NUM_CHANGE = "PAGE_NUM_CHANGE";
export const PAGE_SIZE_CHANGE = "PAGE_SIZE_CHANGE";
export const SEARCH_FIELD_CHANGE = "SEARCH_FIELD_CHANGE";

const userHttpService = UserHttpService.getInstance();

export const fetchUserInfoPageBegin = (): ActionPayload => {
  return {
    type: FETCH_USER_INFO_PAGE_BEGIN,
  };
};

export const fetchUserInfoPageSuccess = (value: UserInfoPageDto): ActionPayload => {
  return {
    type: FETCH_USER_INFO_PAGE_SUCCESS,
    payload: value,
  };
};

export const fetchUserInfoPageFailed = (value: Error): ActionPayload => {
  return {
    type: FETCH_USER_INFO_PAGE_FAILED,
    payload: value,
  };
};

export const pageNumChange = (value: number): ActionPayload => {
  return {
    type: PAGE_NUM_CHANGE,
    payload: value,
  };
};

export const pageSizeChange = (value: number): ActionPayload => {
  return {
    type: PAGE_SIZE_CHANGE,
    payload: value,
  };
};

export const searchFieldChange = (filter: UserFilterDto): ActionPayload => {
  console.log(filter);
  return {
    type: SEARCH_FIELD_CHANGE,
    payload: filter,
  };
};

export const fetchUserInfoPage = (filter: UserFilterDto, pageNum: number, pageSize: number) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchUserInfoPageBegin());
    const searchFilter = lodash.assign({}, filter);
    searchFilter.source = searchFilter.source && searchFilter.source > 0 ? searchFilter.source : undefined;
    searchFilter.active = searchFilter.active && searchFilter.active > 0 ? searchFilter.active : undefined;
    return userHttpService
      .getUserInfosByFilter(searchFilter, pageNum, pageSize)
      .then(response => {
        dispatch(fetchUserInfoPageSuccess(response.data));
      })
      .catch(err => {
        dispatch(fetchUserInfoPageFailed(err));
      });
  };
};
