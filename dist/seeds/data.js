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
    '1@email.com',
    '2email.com',
    '3email.com',
    '4email.com',
    '5email.com',
    '6email.com',
    '7email.com',
    '8email.com',
    '9email.com',
    '10email.com'
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
