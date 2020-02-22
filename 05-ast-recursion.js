const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require("graphql");

    const User = new GraphQLObjectType({
        name: "User",
        fields: () => ({
            name: {
                type:  GraphQLString,
                resolve: () => 'Lesha'
            },
            bestFriend: {
                type: User,
                resolve: () => ({})
            }
        })
    })

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQuery",
        fields: {
            user: {
                type: User,
                resolve: () => ({})
            }
        }
    })
});

const source = "{ user {bestFriend {bestFriend {name}}}}";

graphql({
    schema,
    source
}).then(({ data }) => console.log(JSON.stringify(data)));
