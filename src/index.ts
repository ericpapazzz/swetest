import express, {type Application, type Request, type Response} from "express";
import Database from "./config/database.js";


class App {

    public app: Application;

    constructor(){
        this.app=express();
        this.databaseSync();
        this.routes();
    }

    protected databaseSync(): void {
        const db = new Database();
        db.sequelize?.sync();
      }

    protected routes():void{
        this.app.route("/").get((req:Request,res:Response)=>{
            res.send("Home");
        }
        )
    }
}

const port:number = 8000
const app = new App().app

app.listen(port,()=>{
    console.log("Server started succesfully.");
})