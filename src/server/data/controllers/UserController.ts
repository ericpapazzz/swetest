import { type Request, type Response } from "express";
import { User } from "../models/User.js";
import { UserRepository } from "../repositories/UserRepository.js";

/**
 * userController class handles HTTP requests related to user operations
 * provides CRUD operations for user management
 */
class UserController {
    // creates a new user
    async create(req: Request, res: Response) {
        try {
            const newUser = new User();

            newUser.username = req.body.username;

            await new UserRepository().save(newUser);

            res.status(200).json({
                status: "OK",
                message: "Successfully created User.",
                data: newUser
            });
        } catch (error) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!",
            })
        }
    }

    // updates an existing user

    async update(req: Request, res: Response) {
        try {
            let id = parseInt(req.params["id"] || "0");
            
            if (id <= 0) {
                return res.status(400).json({
                    status: "Bad Request",
                    message: "Invalid user ID"
                });
            }

            const updatedUser = await new UserRepository().update(id, req.body.username);

            res.status(200).json({
                status: "OK",
                message: "Successfully updated User.",
                data: updatedUser
            });
        } catch (error) {
            console.error("Update controller error:", error);
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }

//    deletes a user by ID
    async delete(req: Request, res: Response) {
        try {
            let id = parseInt(req.params["id"] || "0");
            
            await new UserRepository().delete(id)

            res.status(200).json({
                status: "OK",
                message: "Successfully deleted User.",
                data: { deletedId: id }
            });
        } catch (error) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!",
            })
        }
    }

    // retrieves a user by their ID
    async findById(req: Request, res: Response) {
        try {
            let id = parseInt(req.params["id"] || "0");
            
            const user = await new UserRepository().retrieveById(id);

            res.status(200).json({
                status: "OK",
                message: "Successfully fetched user by id!",
                data: user,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!",
            });
        }
    }

    // retrieves all users from the database
    async findAll(req: Request, res: Response) {
        try {
            const users = await new UserRepository().retrieveAll();

            res.status(200).json({
                status: "OK",
                message: "Successfully fetched all users!",
                data: users,
            });
        } catch (err) {
            console.error("FindAll error:", err);
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!",
                error: err instanceof Error ? err.message : "Unknown error"
            });
        }
    }
}

export default new UserController()