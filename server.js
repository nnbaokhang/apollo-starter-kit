import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';
//import compression from 'compression';
//import { Engine } from 'apollo-engine';
const GRAPHQL_PORT = 3000;
//Comment out this seem not to be working
/*
const ENGINE_API_KEY = 'service:nnbaokhang-3975:YlySk-eSCC4BkhARANxtdQ'; // TODO
const engine = new Engine({
    engineConfig: {
        apiKey: ENGINE_API_KEY,
    },
    graphQLPort: GRAPHQL_PORT
});
engine.start();
*/
//graphQLServer.use(compression());

const graphQLServer = express();

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema ,
    // This option turns on tracing
   // tracing: true
}));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () =>
    console.log(
        `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
    )
);