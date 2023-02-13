var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

const SERVER_PORT = 4000
console.log("Express GraphQL Server")

// GraphQL schema
var schema = buildSchema(
    `type Query {
        hello: String
        greetings(name: String): String
        goodbye: String
    }`
);

// Root resolver
var root = {
    hello: () => 'Hello World!',
    greetings: (args) => {
    return `Hello, ${args.name}`
    },
    goodbye: () => 'See you next time!'
};

var app = express();
// Add graphql as middleware
app.use('/graphql', graphqlHTTP({
    schema: schema,     //Set schema
    rootValue: root,    //Set resolver
    graphiql: true      //Client access
}));

app.listen(SERVER_PORT, () => console.log(`Express GraphQL Server Now Running On http://localhost:${SERVER_PORT}/graphql`));