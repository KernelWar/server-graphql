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

app.use('/graphql', jwt.authJWT, graphqlHTTP({
    schema: graphql.schema,
    rootValue: graphql.rootAuth,
    graphiql: true,
}));

app.use(require('./login'))

app.use(express.static(__dirname + '/dist'));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
});

app.listen(process.env.PORT || 80, () => console.log('Server started'));