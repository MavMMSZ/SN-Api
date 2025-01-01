import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import cleanDB from './cleanDB.js';
try {
    await db();
    await cleanDB();
    const users = [];
    for (let i = 0; i < 10; i++) {
        const username = `user${i + 1}`;
        const email = `${username}@example.com`;
        const user = await User.create({ username, email });
        users.push(user);
    }
    console.log('Users seeded');
    const thoughts = [];
    for (let i = 0; i < 10; i++) {
        const thoughtText = `Thought ${i + 1}`;
        const thought = await Thought.create({ thoughtText });
        thoughts.push(thought);
    }
    console.log('Thoughts seeded');
    for (const thought of thoughts) {
        const randomIndex = Math.floor(Math.random() * users.length);
        const user = users[randomIndex];
        user.thoughts.push(thought._id);
        await user.save();
    }
    console.log('Thoughts associated with users');
    for (const user of users) {
        const randomIndex = Math.floor(Math.random() * users.length);
        const friend = users[randomIndex];
        user.friends.push(friend._id);
        await user.save();
    }
    console.log('Friends associated with users');
    process.exit();
}
catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
}
