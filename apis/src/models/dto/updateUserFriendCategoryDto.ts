import { dtoField, DtoObject } from "tsbatis";

export class UpdateUserFriendCategoryDto extends DtoObject {
    @dtoField()
    public categoryName: string;
}
