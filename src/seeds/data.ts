const users = [
    'user1',
    'user2',
    'user3',
    'user4',
    'user5',
    'user6',
    'user7',
    'user8',
    'user9',
    'user10',
];

const posts = [
    'post1',
    'post2',
    'post3',
    'post4',
    'post5',
    'post6',
    'post7',
    'post8',
    'post9',
    'post10',
];

export const getRandomArrItem = (arr: any) => arr[Math.floor(Math.random() * arr.length)];

export const getRandomName = () => getRandomArrItem(users);

export const getRandomThoughts = () => getRandomArrItem(posts);

export const getRandomPostContent = () => {
    const results: { post: string; content: string }[] = [];
    for (let i = 0; i < 5; i++) {
        results.push({
            post: getRandomPost(),
            content: 'This is a post content',
        });
    }
    return results;
};