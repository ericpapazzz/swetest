import express, {type Application, type Request, type Response} from "express";
import Database from "./server/config/database.js";
import UserRouter from "./server/data/router/UserRoute.js";

/**
 * main application class that configures and initializes the express server
 * handles database connection, middleware setup, and route configuration
 */
class App {
    public app: Application;

    constructor(){
        // create express application instance
        this.app = express();
        
        // configure middleware for request parsing
        this.plugins();
        
        // establish database connection and sync models
        this.databaseSync();
        
        // configure application routes and endpoints
        this.routes();
    }

    /**
     * configures express middleware for request parsing
     * sets up JSON and URL-encoded body parsing for incoming requests
     * protected method - only accessible within class and subclasses
     */
    protected plugins(): void {
        // enable JSON body parsing for POST/PUT requests
        this.app.use(express.json())
        
        // enable URL-encoded body parsing with extended syntax support
        // extended: true allows parsing of nested objects in form data
        this.app.use(express.urlencoded({extended: true}))
    }

    // initializes database connection and synchronizes sequelize models
    protected databaseSync(): void {
        const db = new Database();

        db.sequelize?.sync();
    }

    protected routes(): void {
        // serves as health check endpoint and application entry point
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("Home");
        });
        this.app.use("/api/v1", UserRouter);
    }
}

// server configuration - port number for HTTP server
const port: number = 8000

// create application instance and extract express app
const app = new App().app

// start HTTP server on specified port
// listens for incoming requests and provides startup confirmation
app.listen(port, () => {
    console.log("Server started successfully.");
})