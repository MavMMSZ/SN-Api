import { User, Thought } from '../models/index.js';

const cleanDB = async () => {
    try {
        await User.deleteMany({});
        console.log('Users deleted');

        await Thought.deleteMany({});
        console.log('Thoughts deleted');
    } catch (error) {
        console.error('Error cleaning DB:', error);
    }
}

export default cleanDB;