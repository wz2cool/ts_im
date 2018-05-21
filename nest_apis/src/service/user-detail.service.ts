import { Component } from '@nestjs/common';
import { DbCoreService } from './db-core.service';
import { CreateUserDetailDto, UpdateUserDetailDto } from 'model/dto';
import { IConnection, CommonHelper } from 'tsbatis';
import { UserDetail } from '../model/entity/table/userDetail';
import { DisplayException } from '../model/exception';
import { UserDetailMapper } from '../mapper';

@Component()
export class UserDetailService {
    constructor(private readonly dbCoreService: DbCoreService) {
        console.log('UserDetailService init');
    }

    public async createUserDetail(createUserDetailDto: CreateUserDetailDto): Promise<number> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (this.isDtoEmpty(createUserDetailDto)) {
                throw new DisplayException('参数不能为空');
            }
            const userDetail = this.createDtoToEntity(createUserDetailDto);
            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const mapper = new UserDetailMapper(conn);
            const effectRows = await mapper.insertSelective(userDetail);
            console.log('effectRows: ', effectRows);
            await conn.commit();
            return new Promise<number>((resolve, reject) => resolve(userDetail.id));
        } catch (error) {
            if (beginTrans) {
                await conn.rollback();
            }
            return new Promise<number>((resolve, reject) => reject(error));
        } finally {
            if (!CommonHelper.isNullOrUndefined(conn)) {
                await conn.release();
            }
        }
    }

    public async updateUserDetail(userDetailId: number, updateUserDetailDto: UpdateUserDetailDto): Promise<void> {
        let conn: IConnection;
        let beginTrans: boolean = false;

        try {
            if (this.isDtoEmpty(updateUserDetailDto)) {
                throw new DisplayException('参数不能为空');
            }
            const userDetail = this.updateDtoToEntity(userDetailId, updateUserDetailDto);
            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const mapper = new UserDetailMapper(conn);
            const effectRows = await mapper.updateByPrimaryKeySelective(userDetail);
            console.log('effectRows: ', effectRows);
            await conn.commit();
            return new Promise<void>((resolve, reject) => resolve());
        } catch (error) {
            if (beginTrans) {
                await conn.rollback();
            }
            return new Promise<void>((resolve, reject) => reject(error));
        } finally {
            if (!CommonHelper.isNullOrUndefined(conn)) {
                await conn.release();
            }
        }
    }

    public async deleteUserDetail(userDetailId: number): Promise<void> {
        let conn: IConnection;
        let beginTrans: boolean = false;
        try {
            if (CommonHelper.isNullOrUndefined(userDetailId)) {
                throw new DisplayException('参数不能为空');
            }
            conn = await this.dbCoreService.getConnection();
            await conn.beginTransaction();
            beginTrans = true;
            const mapper = new UserDetailMapper(conn);
            const effectRows = await mapper.deleteByPrimaryKey(userDetailId);
            console.log('effectRows: ', effectRows);
            await conn.commit();
            return new Promise<void>((resolve, reject) => resolve());
        } catch (error) {
            if (beginTrans) {
                await conn.rollback();
            }
            return new Promise<void>((resolve, reject) => reject(error));
        } finally {
            if (!CommonHelper.isNullOrUndefined(conn)) {
                await conn.release();
            }
        }
    }

    private isDtoEmpty(dto: any): boolean {
        return CommonHelper.isNullOrUndefined(dto) || JSON.stringify(dto) === '{}';
    }

    private createDtoToEntity(createUserDetailDto: CreateUserDetailDto): UserDetail {
        const userDetail = new UserDetail();
        userDetail.age = createUserDetailDto.age;
        userDetail.city = createUserDetailDto.city;
        userDetail.province = createUserDetailDto.province;
        userDetail.qq = createUserDetailDto.qq;
        userDetail.sex = createUserDetailDto.sex;
        userDetail.userId = createUserDetailDto.userId;
        userDetail.wechat = createUserDetailDto.wechat;
        userDetail.createTime = new Date();
        userDetail.updateTime = new Date();
        return userDetail;
    }

    private updateDtoToEntity(userDetailId: number, updateUserDetailDto: UpdateUserDetailDto): UserDetail {
        const userDetail = new UserDetail();
        userDetail.id = userDetailId;
        userDetail.age = updateUserDetailDto.age;
        userDetail.city = updateUserDetailDto.city;
        userDetail.province = updateUserDetailDto.province;
        userDetail.qq = updateUserDetailDto.qq;
        userDetail.sex = updateUserDetailDto.sex;
        userDetail.wechat = updateUserDetailDto.wechat;
        userDetail.updateTime = new Date();
        return userDetail;
    }

}