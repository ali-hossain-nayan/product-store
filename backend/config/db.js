import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL, {
        });
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); //process code 1 means exit with error, 0 means exit without error
    }
}