import mongoose from 'mongoose';
const db = async () => {
    try {
        await mongoose.connect(process.env.MONGOD_URI || 'mongodb://localhost:27017/sn-api');
        console.log('Database connected');
        return mongoose.connection;
    }
    catch (error) {
        console.error('Database connection error');
        throw new Error("Database connection error");
    }
};
export default db;
