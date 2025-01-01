const usernames = [
    'John',
    'Jane',
    'Doe',
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Rodriguez',
];
const email = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10'
];
const thoughts = [
    'Hello World',
    'Goodbye World',
    'I am a thought',
    'I am another thought',
    'I am a thought too',
    'I am a thought as well',
    'I am a thought also',
    'I am a thought again',
    'I am a thought once more',
];
export const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const getRandomUsername = () => `${getRandom(usernames)}${getRandom(usernames)}`;
export const getRandomEmail = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            username: getRandomUsername(),
            email: `${getRandom(email)}@example.com`
        });
    }
    return results;
};
