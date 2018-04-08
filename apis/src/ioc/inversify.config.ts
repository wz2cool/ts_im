import { Container } from "inversify";
// tslint:disable-next-line:no-implicit-dependencies
import "reflect-metadata";
import { ConnectionFactory, MysqlConnectionConfig } from "tsbatis";

const config = new MysqlConnectionConfig();
config.database = process.env.DATABASE_DB;
config.host = process.env.DATABASE_HOST;
config.port = process.env.DATABASE_PORT;
config.user = process.env.DATABASE_USER;
config.password = process.env.DATABASE_PWD;

const connectionFactory = new ConnectionFactory(config, true);
const myContainer = new Container();
myContainer.bind(ConnectionFactory).toConstantValue(connectionFactory);

export { myContainer };
