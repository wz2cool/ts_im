import { Component } from '@nestjs/common';
import { ConnectionFactory, MysqlConnectionConfig, IConnection } from 'tsbatis';

@Component()
export class DbCoreService {
    readonly connectionFactory;
    constructor() {
        console.log('DbCoreService init');
        const enableDatabaseLog: boolean = process.env.ENABLE_DATABASE_LOG.toLowerCase() === 'true';
        console.log('enable database log: ' + enableDatabaseLog);
        const config = new MysqlConnectionConfig();
        config.database = process.env.DATABASE_DB;
        config.host = process.env.DATABASE_HOST;
        config.port = Number.parseInt(process.env.DATABASE_PORT);
        config.user = process.env.DATABASE_USER;
        config.password = process.env.DATABASE_PWD;
        this.connectionFactory = new ConnectionFactory(config, enableDatabaseLog);
    }

    public getConnection(): Promise<IConnection> {
        return this.connectionFactory.getConnection();
    }
}