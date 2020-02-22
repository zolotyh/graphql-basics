const {graphql, buildSchema} = require('graphql');

const sdl = `
    type  Query {
        hello: String
        hello2: String
        hello3: String
    }
`;

const schema = buildSchema(sdl);

const source = `{hello, hello2, hello3 }`;

const rootValue = {
    hello: 'world',
    hello2: () => 'world',
    hello3: async () => Promise.resolve('world')
}

graphql({schema,source,rootValue},).then(({data}) => {
    console.log(JSON.stringify(data));
});
