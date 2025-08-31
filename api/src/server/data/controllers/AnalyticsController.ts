import { type Request, type Response } from "express";
import { User } from "../models/User.js";

class AnalyticsController {
    async getUserAnalytics(req: Request, res: Response) {
        try {
            // get all users and ensure the result is an array
            const users = (await User.findAll()) || [];
            
            // filter out any users who do not have a username defined
            const validUsers = users.filter(user => user && user.username);
            
            // calculate number of existing users
            const totalUsers = validUsers.length;
            
            let longestName = '';
            let shortestName = '';

            // only run reduce if there are valid users
            if (validUsers.length > 0) {
                // Get the first user and assert that it is not null or undefined
                const firstUser = validUsers[0]!;
                
                // find longest and shortest names
                longestName = validUsers.reduce((longest, user) => 
                    user.username.length > longest.length ? user.username : longest, firstUser.username
                );
                
                shortestName = validUsers.reduce((shortest, user) => 
                    user.username.length < shortest.length ? user.username : shortest, firstUser.username
                );
            }
            
            const analytics = {
                summary: {
                    totalUsers
                },
                extremes: {
                    longestName,
                    shortestName,
                    longestNameLength: longestName.length,
                    shortestNameLength: shortestName.length
                },
            };
            
            res.status(200).json({
                status: "OK",
                message: "Analytics generated successfully",
                data: analytics
            });
            
        } catch (error) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Failed to generate analytics",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }
}

export default new AnalyticsController();