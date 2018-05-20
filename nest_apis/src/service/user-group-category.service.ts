import * as lodash from 'lodash';
import { Component } from '@nestjs/common';
import { DbCoreService } from './db-core.service';
import { CreateGroupDto, UpdateGroupDto, GroupDto, GroupPageDto, CreateUserGroupCategoryDto, UpdateUserGroupCategoryDto } from '../model/dto';
import { CommonHelper, IConnection, Page, PageRowBounds, DynamicQuery, SortDescriptor, SortDirection } from 'tsbatis';
import { UserGroupCategory } from '../model/entity/table/user-group-category';
import { GroupMapper, UserGroupCategoryMapper } from '../mapper';
import { DisplayException } from '../model/exception';

@Component()
export class UserGroupCategoryService {
    constructor(private readonly dbCoreService: DbCoreService) {
        console.log('UserGroupService init');
    }

    public async createUserGroupCategory(createUserGroupCategoryDto: CreateUserGroupCategoryDto): Promise<number> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (this.isDtoEmpty(createUserGroupCategoryDto)) {
                throw new DisplayException('参数不能为空');
            }
            const userGroupCategory = this.createDtoToEntity(createUserGroupCategoryDto);
            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const userGroupCategoryMapper = new UserGroupCategoryMapper(conn);
            const effectRows = await userGroupCategoryMapper.insertSelective(userGroupCategory);
            console.log('effectRows: ', effectRows);
            await conn.commit();
            await conn.release();
            return new Promise<number>((resolve, reject) => resolve(userGroupCategory.id));
        } catch (error) {
            if (!CommonHelper.isNullOrUndefined(conn)) {
                if (beginTrans) {
                    await conn.rollback();
                }
                await conn.release();
            }
            return new Promise<number>((resolve, reject) => reject(error));
        }
    }

    private isDtoEmpty(dto: any): boolean {
        return CommonHelper.isNullOrUndefined(dto) || JSON.stringify(dto) === '{}';
    }

    private createDtoToEntity(createUserGroupCategoryDto: CreateUserGroupCategoryDto): UserGroupCategory {
        const userGroupCategory = new UserGroupCategory();
        userGroupCategory.categoryIndex = createUserGroupCategoryDto.categoryIndex;
        userGroupCategory.categoryName = createUserGroupCategoryDto.categoryName;
        userGroupCategory.userId = createUserGroupCategoryDto.userId;
        userGroupCategory.createTime = new Date();
        userGroupCategory.updateTime = new Date();
        return userGroupCategory;
    }

    private updateDtoToEntity(userId: number, updateUserGroupCategoryDto: UpdateUserGroupCategoryDto): UserGroupCategory {
        const userGroupCategory = new UserGroupCategory();
        userGroupCategory.userId = userId;
        userGroupCategory.categoryName = updateUserGroupCategoryDto.categoryName;
        userGroupCategory.categoryIndex = updateUserGroupCategoryDto.categoryIndex;
        userGroupCategory.updateTime = new Date();
        return userGroupCategory;
    }
}