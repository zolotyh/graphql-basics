const {graphql, buildSchema} = require('graphql');

const sdl = `
    type  Query {
        userList: [User]
    }
    type User {
        name: String
    }
`;

const schema = buildSchema(sdl);

const source = `{ userList {name} }`;

const rootValue = {
    userList: [{name: 'test'}]
}

graphql({schema,source,rootValue},).then(({data}) => {
    console.log(JSON.stringify(data));
});
