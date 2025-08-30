import {User} from "../models/User.js";

interface IUserRepository {
    save(user: User): Promise<void>;
    update(user: User): Promise<void>;
    delete(userId: number): Promise<void>;
    retrieveById(userId: number): Promise<User>;
    retrieveAll(): Promise<User[]>;
}

export class UserRepository implements IUserRepository {
    async save(user: User): Promise<void> {
        try{
            await User.create({
                user_name: user.username
            } as any);
        }catch(error){
            throw new Error("Failed to create user.");
        }
    }
    async update(user: User): Promise<void> {
        try{
            const newUser = await User.findOne({
                where:{
                    user_id:user.user_id
                },
            });

            if(!newUser){
                throw new Error("User not found.");
            }
            newUser.username = user.username;
            await newUser.save();

        }catch(error){
            throw new Error("Failed to update user.");
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
        }catch(error){
            throw new Error("Failed to retreive user.");
        }
    }
    async retrieveAll(): Promise<User[]> {
        try{

            return await User.findAll();

        }catch(error){
            throw new Error("Failed to retrieve all users.");
        }
    }

}