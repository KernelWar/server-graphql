var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const path = require('path');
const models = require('./init_db')
const { Op, fn, where, col } = require('sequelize')
models.syncdb()
var schema = buildSchema(`
    type Employee {    
        id_employee: Int
        name: String
        last_name: String
        email: String
        nationality: String
        phone: String
        civil_status: String
        birthday: String 
    }

    input EmployeeInput{
        name: String
        last_name: String
        email: String
        phone: String
    }
    
    type Query {
        getEmployees(limit: Int!, page: Int!): [Employee]
        getEmployeeByKeyword(limit: Int!, page: Int!, search: String!): [Employee]
    }

    type Mutation{
        updateEmployee(id_employee: Int!, input: EmployeeInput): Employee
    }
  
      
`);

var root = {
    getEmployees: (args) => models.Employee.findAll({ offset: (args.page == 0 ? 0 : args.page - 1) * args.limit, limit: args.limit }),
    getEmployeeByKeyword: (args) => models.Employee.findAll({
        offset: (args.page == 0 ? 0 : args.page - 1) * args.limit,
        limit: args.limit,
        where: require('sequelize').or(
            { id_employee: { [Op.like]: `%${args.search}%` }, },
            { name: { [Op.like]: `%${args.search}%` }, },
            { last_name: { [Op.like]: `%${args.search}%` }, },
            { email: { [Op.like]: `%${args.search}%` }, },
            { nationality: { [Op.like]: `%${args.search}%` }, },
            { phone: { [Op.like]: `%${args.search}%` }, },
            { civil_status: { [Op.like]: `%${args.search}%` }, },
            where(
                fn('DATE_FORMAT', col('birthday'), '%d/%M/%Y'),
                { [Op.like]: `%${args.search}%` }
            )
        )
    }),
    updateEmployee: (args) =>
        models.Employee.update(
            args.input,
            {
                where: {
                    id_employee: args.id_employee
                }
            }
        ).then(()=>{
            return models.Employee.findOne({
                where:{
                    id_employee: args.id_employee
                }
            })
        })
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.use(express.static(__dirname + '/dist/angular-graphql'));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/angular-graphql', 'index.html'))
});
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));