import { dtoField, DtoObject } from "tsbatis";

export class UpdateGroupDto extends DtoObject {
    @dtoField()
    public groupName: string;
    @dtoField()
    public subject: string;
    @dtoField()
    public canInvite: boolean;
    @dtoField()
    public canRegister: boolean;
    @dtoField()
    public publicGroup: boolean;
    @dtoField()
    public description: string;
}
