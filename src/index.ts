import express, {type Application, type Request, type Response} from "express";


class App {

    public app: Application;

    constructor(){
        this.app=express();
        this.routes();
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