// Написать интеграцию сервером
const express = require("express");
const { graphql, buildSchema } = require("graphql");
const url = require("url");

const app = express();

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const rootValue = {
    hello: 'world',
};

app.get("/", async (req, resp) => {
    try {
        const source = req.query.source;
        const { data } = await graphql({ source, schema, rootValue });
        resp.send(data);
    } catch (e) {
        return e;
    }
});

app.listen(3000, () => {
    console.log("running on 3000 port");
});
