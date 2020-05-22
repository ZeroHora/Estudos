require('dotenv').config()
// require("dotenv-safe").config();
// require('@tvgloborecursosartisticos/joi-ptbr')

require('./utils/pt_br')

const AWS = require('aws-sdk')
const awilix = require('awilix')

const init = async () => {

//  const DB_CONFIG_Pool_MYSQL  = {
//     "connectionLimit":  10,
//     "port":             3306,
//     "host":             "localhost",
//     "user":             "root",
//     "password":         "adm1234",
//     "database":         "estudo",
//     "autocommit": 0
// }


  const  DB_CONFIG_MYSQL_JSON =
  { 
    "host":     "localhost",  
    "user":      "root", 
    "password":  "adm1234", 
    "database":  "estudo"
  }
  

  // SSM - instancia
  const ssm = new AWS.SSM()

  // SSM - DB
  const ssmParams = { Name:  DB_CONFIG_MYSQL_JSON, WithDecryption: true }
  const dbPoolConnectionConfig =  DB_CONFIG_MYSQL_JSON ?  DB_CONFIG_MYSQL_JSON : JSON.parse((await ssm.getParameter(ssmParams).promise()).Parameter.Value)
 
  // const ssmParams = { Name: process.env.DB_CONFIG_MYSQL_JSON , WithDecryption: true }
  // const dbPoolConnectionConfig = process.env.DB_CONFIG_MYSQL_JSON  ? JSON.parse(process.env.DB_CONFIG_MYSQL_JSON ) : JSON.parse((await ssm.getParameter(ssmParams).promise()).Parameter.Value)


 const container = awilix.createContainer()

 
 container.register({
 
    moment:           awilix.asValue(require('moment')) ,
    mysqldb:          awilix.asValue(require('mysql')) ,
    joi:              awilix.asValue(require('joi')),
    expressValidator: awilix.asValue(require('express-joi-validation').createValidator({})),
    apicache:         awilix.asValue(require('apicache')),

    dbPoolConnectionConfig: awilix.asValue(dbPoolConnectionConfig),
    dbConnectionPoolClient: awilix.asClass(require('./utils/db/mysql-db-connection-pool')).singleton(),

    alunoDomain:     awilix.asClass(require('./domain/aluno-domain')).scoped(),
    alunoController: awilix.asFunction(require('./adapters/aluno-rest-api').Controller).scoped(),
    alunoRoute:      awilix.asFunction(require('./adapters/aluno-rest-api').Route).scoped(),
    alunoSchema:     awilix.asFunction(require('./adapters/aluno-rest-api').Schema).singleton(),
    alunoDb:         awilix.asClass(require('./adapters/aluno-db-adapter')).singleton(),

  })

// WEBSERVER

  const Webserver = require('./webserver-component/webserver-component')

  new Webserver(process.env.SERVER_PORT, {
    initialPluginList: [
                        //  [require('./adapters/scope-interceptor')({ container })]
                       ],
  finalPluginList: [ ],
    routeList: [
                container.resolve('alunoRoute') 
               ]
  }).init()
 
}

init()

 