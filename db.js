
const { Sequelize, DataTypes } = require('sequelize');
let environment 
if(process.env.NODE_ENV){
    environment = require('./environment/environment.prod').environment
}else{
    environment = require('./environment/environment.dev').environment
}

const sequelize = new Sequelize(environment.database_name, environment.user, environment.password ,{
    host: environment.host,
    port: environment.port,
    dialect: 'mysql',
    logging: !environment.production
})

const moment = require('moment')
const Employee = sequelize.define('Employee',{
    id_employee: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    civil_status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false,
        get(){
            if(process.env.NODE_ENV == undefined){
                return moment(this.getDataValue('birthday')).add(1, 'day').format('DD MMMM YYYY')
            }            
        }
    }
})

const User = sequelize.define('User', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    full_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})



function syncdb(){
    sequelize.sync({ force: false });
}


module.exports = {
    Employee,
    User,
    syncdb
}

