const {graphql, buildSchema} = require('graphql');

const sdl = `
    type  Query {
        user: User
    }
    type User {
        name: String
        bestFriend: User
    }
`;

const getUser = () => ({
    name: 'UserName',
    bestFriend: getUser
});

const schema = buildSchema(sdl);

const source = `{ user {bestFriend {bestFriend {bestFriend {name}}}}}`;

const rootValue = {
    user: getUser
}

graphql({schema,source,rootValue},).then(({data}) => {
    console.log(JSON.stringify(data));
});
