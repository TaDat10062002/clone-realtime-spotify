import mongoose from "mongoose";

export const connectDB = async (MONGDB_URI) => {
    try {
        const conn = await mongoose.connect(MONGDB_URI);
        console.log(`Connected to mongoDB successfully ${conn.connection.host}`);
    } catch (error) {
        console.log(`Failed connecting to mongoDB ${error}`)
    }
}