import {Sequelize} from "sequelize-typescript";
import * as dotenv from "dotenv";
import { User } from "../data/models/User.js";

dotenv.config();

class Database{
    public sequelize: Sequelize | undefined;
    private connectionPromise: Promise<void>;

    private POSTGRES_DB = process.env.POSTGRES_DB as string;
    private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
    private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
    private POSTGRES_USER = process.env.POSTGRES_USER as string;
    private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;


    constructor(){
        this.connectionPromise = this.connectToPosgres();
    }
    
    public async waitForConnection(): Promise<void> {
        await this.connectionPromise;
    }
    
    private async connectToPosgres(){
        this.sequelize = new Sequelize({
            database: this.POSTGRES_DB,
            username: this.POSTGRES_USER,
            password: this.POSTGRES_PASSWORD,
            host: this.POSTGRES_HOST,
            port: this.POSTGRES_PORT,
            dialect: "postgres",
            logging: false
        });

        try {
            // register models
            this.sequelize.addModels([User]);
            
            // authenticate connection
            await this.sequelize.authenticate();
            console.log("PostgreSQL Connection established successfully");
            
            // sync models to create tables
            await this.sequelize.sync({ force: false });
            console.log("Models synced successfully");
            
        } catch (err) {
            console.error("Database connection error:", err);
            throw err;
        }
    }
}

export default Database