import mongoose from "mongoose";

export const connectDB = async (input: string) => {
    try {
        const connection = await mongoose.connect(input);
        console.log(`Connected to ${connection.connection.name}`);
        return connection;
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}