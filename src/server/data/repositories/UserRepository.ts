import {User} from "../models/User.js";

interface IUserRepository {
    save(user: User): Promise<void>;
    update(userId: number, username: string): Promise<User>;
    delete(userId: number): Promise<void>;
    retrieveById(userId: number): Promise<User>;
    retrieveAll(): Promise<User[]>;
}

export class UserRepository implements IUserRepository {
    async save(user: User): Promise<void> {
        try{
            await User.create({
                username: user.username
            });
        }catch(error){
            console.error("Save error:", error);
            throw new Error("Failed to create user.");
        }
    }
    async update(userId: number, username: string): Promise<User> {
        try{
            const existingUser = await User.findOne({
                where:{
                    user_id: userId
                },
            });

            if(!existingUser){
                throw new Error("User not found.");
            }
            existingUser.username = username;
            await existingUser.save();

            return existingUser;

        }catch(err){
            console.error("Update error:", err);
            throw new Error("Failed to update user: " + (err instanceof Error ? err.message : String(err)));
        }
    }
    async delete(userId: number): Promise<void> {
        try{
            const newUser = await User.findOne({
                where:{
                    user_id:userId
                },
            });

            if(!newUser){
                throw new Error("User not found.");
            }
            await newUser.destroy();
            
        }catch(error){
            throw new Error("Failed to delete user.");
        }
    }
    async retrieveById(userId: number): Promise<User> {
         try{
            const newUser = await User.findOne({
                where:{
                    user_id:userId
                },
            });

            if(!newUser){
                throw new Error("User not found.");
            }

            return newUser;
        }catch(err){
            throw new Error("Failed to retreive user." + err);
        }
    }
    async retrieveAll(): Promise<User[]> {
        try{

            return await User.findAll();

        }catch(err){
            throw new Error("Failed to retrieve all users." + err);
        }
    }

}