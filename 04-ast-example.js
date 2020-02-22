const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require("graphql");

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQuery",
        fields: {
            hello: {
                type: GraphQLString,
                resolve: () => "world"
            }
        }
    })
});

const source = "{hello}";

graphql({
    schema,
    source
}).then(({ data }) => console.log(JSON.stringify(data)));
