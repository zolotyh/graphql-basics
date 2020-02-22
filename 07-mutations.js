const { graphql, buildSchema } = require("graphql");

class DB {
    state = {};

    get({ key }) {
        return this.state[key];
    }

    set({ key, value }) {
        this.state[key] = value;
        return value;
    }

    getByIDs(IDs) {
        return IDs.map(id => this.state[id]);
    }

    constructor(state) {
        this.state = state;
    }
}

const db = new DB({ key1: "value1", key2: "value2", key3: "value3" });

const schema = buildSchema(`
    type Query {
        get(key: String): String
    }
    type Mutation {
        set(key: String, value: String): String
    }
`);

const rootValue = {
    get: ({ key }) => {
        return Promise.resolve(db.get({ key }));
    },
    set: ({ key, value }) => {
        return Promise.resolve(db.set({ key, value }));
    }
};

const source = 'mutation Main {set(key:"hello", value: "test")}';
const source1 = '{get(key:"hello")}';

graphql({ source, schema, rootValue }).then(() => {
    graphql({ source: source1, schema, rootValue }).then(({ data }) => {
        console.log(JSON.stringify(data));
    });
});
