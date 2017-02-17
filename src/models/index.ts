import * as glob from "glob";
import * as path from "path";
import * as SequelizeStatic from "sequelize";
import {Sequelize} from "sequelize";

// export interface SequelizeModels {
//     Tag: SequelizeStatic.Model<TagInstance, TagAttributes>;
// }

class Database {
    private _basename: string;
    // private _models: SequelizeModels;
    private _models: any;
    private _sequelize: Sequelize;

    constructor() {
        this._basename = path.basename(module.filename);
        let dbConfig = {
            database: 'lmj_dev',
            username: 'postgres',
            password: 'postgres',
            host: 'localhost',
            dialect: 'postgres',
        };

        this._sequelize = new SequelizeStatic(dbConfig.database, dbConfig.username,
            dbConfig.password, dbConfig);
        this._models = ({} as any);

        glob.sync('**/*model.ts', {
            cwd: __dirname
        }).forEach(file => {
            let model = this._sequelize.import(path.join(__dirname, file));
            this._models[(model as any).name] = model;
        })

        Object.keys(this._models).forEach((modelName: string) => {
            if (typeof this._models[modelName].associate === "function") {
                this._models[modelName].associate(this._models);
            }
        });
    }

    getModels() {
        return this._models;
    }

    getSequelize() {
        return this._sequelize;
    }

    initTables() {
        return this._sequelize.sync({force: false})
            .catch(err => {
                throw err
            })
    }
}

const database = new Database()
database.initTables()
export const models = database.getModels()
export const sequelize = database.getSequelize()