import express, { type Application, type Request, type Response } from "express";
import cors from "cors";
import Database from "./server/config/database.js";
import UserRouter from "./server/data/router/UserRoute.js";
import HealthRoute from "./server/data/router/HealthRoute.js";
import AnalyticsRoute from "./server/data/router/AnalyticsRoute.js";

/**
 * Main application class that configures and initializes the Express server.
 * Handles middleware setup and route configuration. Database connection is
 * now handled asynchronously outside the constructor for a more robust startup flow.
 */
class App {
    public app: Application;

    constructor() {
        // create an Express application instance
        this.app = express();
        
        // configure standard middleware for request processing
        this.configureMiddleware();
        
        // configure application routes and endpoints
        this.configureRoutes();
    }

    // configures Express middleware for request parsing and CORS.
    protected configureMiddleware(): void {
        // enable CORS for frontend requests from http://localhost:5173

        console.log("CORS middleware is being configured.");
        
        this.app.use(cors({
            origin: '*',
            credentials: true // Include this if your frontend sends cookies, auth headers, etc.
        }));
        
        // Enable JSON body parsing for POST/PUT requests
        this.app.use(express.json());
        
        // Enable URL-encoded body parsing with extended syntax support
        this.app.use(express.urlencoded({ extended: true }));
    }

    /**
     * Configures the application's routes and endpoints.
     */
    protected configureRoutes(): void {
        // A simple health check endpoint and application entry point
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("Home");
        });
        
        // Mount user-related routes under the /api/v1 path
        this.app.use("/api/v1", UserRouter);

        // Mount health check routes
        this.app.use("/api/v1", HealthRoute);

        // Mount user analytics routes
        this.app.use("/api/v1", AnalyticsRoute);
    }
    
    /**
     * Initializes the database connection.
     * This method is now public and async to be called explicitly before the server starts.
     */
    public async initializeDatabase(): Promise<void> {
        try {
            const db = new Database();
            // Wait for the database connection to be established before proceeding
            await db.waitForConnection();
            console.log("Database initialization completed successfully.");
        } catch (error) {
            console.error("Database initialization failed:", error);
            // Exit the process if the database connection fails, as the app cannot function without it
            process.exit(1);
        }
    }
}

// Server configuration - port number for the HTTP server
const port: number = 8000;

/**
 * Main function to start the server.
 * Ensures all critical services (like the database) are ready before
 * the application begins listening for requests.
 */
const startServer = async () => {
    // Create the application instance
    const appInstance = new App();
    
    // Await the database initialization. The server will not start until this is complete.
    await appInstance.initializeDatabase();
    
    // Start the HTTP server on the specified port and provide a startup confirmation
    appInstance.app.listen(port, () => {
        console.log(`Server started successfully on port ${port}.`);
    });
};

// Execute the main startup function
startServer();