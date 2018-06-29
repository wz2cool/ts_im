import { ActionPayload } from "../../../models/interface";
import { UserFilterDto } from "../../../models/dto";

export const SEARCH_FIELD_CHANGE = "SEARCH_FIELD_CHANGE";

export const searchFieldChange = (filter: UserFilterDto): ActionPayload => {
  return {
    type: SEARCH_FIELD_CHANGE,
    payload: filter,
  };
};
