import { Router } from "express";
import { type IRouter } from "./RouterInterface.js";

/**
 * abstract base class that provides common router functionality
 * implements the IRouter interface and serves as a foundation for specific route classes
 * handles express Router initialization and enforces route setup through abstract method
 */
abstract class BaseRoutes implements IRouter {
    /**
     * express Router instance that handles HTTP requests
     * initialized in constructor and configured through routes() method
     */
    public router: Router;

    /**
     * constructor initializes the express router and triggers route setup
     * automatically calls routes() method to configure endpoints during instantiation
     */
    constructor() {
        // create new express router instance for handling HTTP requests
        this.router = Router();
        
        // call abstract routes method to set up specific routes
        // this ensures routes are configured immediately when router is created
        this.routes();
    }

    abstract routes(): void;
}

export default BaseRoutes;