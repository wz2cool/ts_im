import { dtoField, DtoObject } from "tsbatis";

export class AddUserFriendCategoryDto extends DtoObject {
    @dtoField()
    public userId: number;
    @dtoField()
    public categoryName: string;
}
