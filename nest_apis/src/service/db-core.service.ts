import { Component } from '@nestjs/common';
import { ConnectionFactory, MysqlConnectionConfig, IConnection, CommonHelper } from 'tsbatis';

@Component()
export class DbCoreService {
    readonly connectionFactory;
    constructor() {
        console.log('DbCoreService init');
        console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
        console.log(`ENABLE_DATABASE_LOG: ${process.env.ENABLE_DATABASE_LOG}`);

        let enableDatabaseLog = false;
        if (!CommonHelper.isNullOrUndefined(process.env.ENABLE_DATABASE_LOG)) {
            enableDatabaseLog =
                process.env.ENABLE_DATABASE_LOG.toLocaleLowerCase().trim() === 'true';
        }

        console.log('enable database log: ' + enableDatabaseLog);
        const config = new MysqlConnectionConfig();
        config.database = process.env.DATABASE_DB;
        config.host = process.env.DATABASE_HOST;
        config.port = Number.parseInt(process.env.DATABASE_PORT);
        config.user = process.env.DATABASE_USER;
        config.password = process.env.DATABASE_PWD;

        console.log('MysqlConfig ' + JSON.stringify(config));

        this.connectionFactory = new ConnectionFactory(config, enableDatabaseLog);
    }

    public getConnection(): Promise<IConnection> {
        return this.connectionFactory.getConnection();
    }
}