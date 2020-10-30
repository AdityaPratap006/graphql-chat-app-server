import express, { Express } from 'express';
import cors from 'cors';
import { ApolloServer, gql, IResolvers } from 'apollo-server-express';
import chalk from 'chalk';

const app: Express = express();

app.use(cors());

// The GraphQL schema
const typeDefs = gql`
    type Query {
        hello: String
    }
`;

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        hello: () => 'world',
    },
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

apolloServer.applyMiddleware({
    app: app,
    bodyParserConfig: {
        limit: '1mb',
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    const localURL = `http://localhost:${PORT}`;
    console.log(`\nServer is ready at ${chalk.blueBright(localURL)}`);

    const graphqlURL = `${localURL}${apolloServer.graphqlPath}`;
    console.log(`GraphQL Server is ready at ${chalk.magentaBright(graphqlURL)}\n`);
});

