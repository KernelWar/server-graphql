var express = require('express');
const cors = require('cors')
const morgan = require('morgan')
var { graphqlHTTP } = require('express-graphql');
const path = require('path');
const graphql = require('./graphql')
var app = express();

const jwt = require('./jwt')

app.use(cors())
app.use(express.json());
app.use(morgan('dev'));

app.use('/graphql',jwt.authJWT, graphqlHTTP({
    schema: graphql.schema,
    rootValue: graphql.rootAuth,
    graphiql: true,
}));

app.use(require('./login'))
/*
app.use(express.static(__dirname + '/dist/angular-graphql'));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/angular-graphql', 'index.html'))
});
*/
app.get('/', (req, res) => {
    res.send('Hello World! - App Graphql')
  })
app.listen(8080, () => console.log('Server started'));