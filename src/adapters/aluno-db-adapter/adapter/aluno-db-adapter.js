const _ = require('lodash')
const moment = require('moment')

module.exports = class AlunoDbAdapter {
  constructor ({ dbConnectionPoolClient }) {
    this.dbClient = dbConnectionPoolClient
              
  }

  async listar (filtro = {}) {
    
    let query = `SELECT id,nome,sobrenome,cpf,dataNascimento FROM alunos where 1 = 1  `
    const filtroUppercase = _.mapValues(filtro, value => _.isString(value) ? value.toUpperCase() : value)
   
    if (_.has(filtroUppercase, 'id')) {
      const id = filtro.id
      query += ` and id = ${id}`
    }

    if (_.has(filtroUppercase, 'nome')) {
      const nome = filtro.nome+'%'
      query += ` and nome like '${nome}'`
    }

    if (_.has(filtroUppercase, 'cpf')) {
      const cpf = filtro.cpf.substring(0,11)
      query += ` and cpf = '${cpf}' `
    }
    
    // let obj = `SELECT id,nome,sobrenome,cpf,dataNascimento FROM alunos where 1 = 1  `
    
    // let obj1 =  this.montarFiltro(filtro) 
    // obj += obj1.toString()

    // obj += ` Order by nome`
    // console.log("listaando.. ",obj)
  
    const result =  await this._execute (query,false)
    return result

   //  const result = this.dbClient.wrapConnection(true, 
   //     async connection => {   
   //       const result =  await this.execute (connection, query)     
   //     // const arr1 = dados.filter( (obj) => {return obj.id === "1"})
   //     // console.log("arr1", arr1)
   //     return result     
   //   })
 }

 montarFiltro(filtro = {}) {

    let _filtro = {}

    const filtroUppercase = _.mapValues(filtro, value => _.isString(value) ? value.toUpperCase() : value)
   
    if (_.has(filtroUppercase, 'id')) {
      const id = filtro.id
      _filtro += ` and id = ${id}`
    }
    if (_.has(filtroUppercase, 'nome')) {
      const nome = filtro.nome+'%'
      _filtro += ` and nome like '${nome}'`
    }
    if (_.has(filtroUppercase, 'cpf')) {
      const cpf = filtro.cpf.substring(0,11)
      _filtro += ` and cpf = '${cpf}' `
    } 
    console.log("montar Filtro ",filtro)
    console.log("Filtro montar",_filtro.toString())

    return _filtro
 }

  async criar (aluno) {

    const dtNascimento =
    String(aluno.datanascimento.getDate()).padStart(2, '0')  + '-' + 
    String(aluno.datanascimento.getMonth()).padStart(2, '0') + '-' +
    String(aluno.datanascimento.getFullYear())

    const nome           =  aluno.nome
    const sobrenome      =  aluno.sobrenome
    const cpf            =  aluno.cpf

    const SQLQuery = 
    `INSERT INTO alunos (nome,sobrenome,cpf,dataNascimento) 
     VALUES ( '${nome}',  
              '${sobrenome}',  
              '${cpf}',
              STR_TO_DATE('${dtNascimento}','%d-%m-%Y'));`

     const result =  await this._execute (SQLQuery, true)
     return result

    //  return this.dbClient.wrapConnection(true, async connection => {
    //     const result = await this.execute (connection, query)
    //     return result 
    //   })
  }

  async atualizar (aluno) {   

    const id = aluno.id
    const sobrenome = aluno.sobrenome
    const cpf = aluno.cpf
    
    const datanascimento = String(aluno.datanascimento.getDate()).padStart(2, '0')  + '-' + 
    String(aluno.datanascimento.getMonth()).padStart(2, '0') + '-' +
    String(aluno.datanascimento.getFullYear())
   
    const SQLQuery = `UPDATE alunos SET
                      sobrenome = '${sobrenome}',
                      cpf =  '${cpf}',
                      datanascimento =  STR_TO_DATE('${datanascimento}','%d-%m-%Y') 
                      WHERE id =  ${id} ;`
   
    const result =  await this._execute (SQLQuery,true)
    return result

    // return this.dbClient.wrapConnection(true, async connection => {
    //   const result = await this.execute (connection, query)
    //   return result 
    // })
  }

  async deletar (idAluno) {  

    console.log("filtro",idAluno)
    // const filtroUppercase = _.mapValues(filtro, value => _.isString(value) ? value.toUpperCase() : value)

    // if (!_.has(filtroUppercase, 'id')) {
    //    return "Id não informado."
    // } 
    if( idAluno == false) {
      return "Id não informado.".push(ingrediente);
    }

    const id = idAluno
    const query = `DELETE FROM ALUNOS WHERE id = ${id}`

    console.log("Deletar",query)

    const result =  await this._execute (query,true)

    console.log("Deletou?",result)

    return result

  }

  

  
  // async execute (connection, query) {
  //   const result = await new Promise((resolve, reject) => {
  //     connection.query(query, (error, result, fields) => {
  //         if (error) {
  //             reject(error)
  //             console.log("error......",error)
  //         } else {
  //             resolve(result)
  //             // console.log("resolve......",result)
  //         }
  //     })
      
  //   })
  //   return result
  // }

//---- Executa qualquer query do MySql (CRUD)
async _execute (query,commit) {

    return this.dbClient.wrapConnection(commit = true, async connection => {

      const result = await new Promise((resolve, reject) => {
        connection.query(query, (error, result, fields) => {
            if (error) {
                reject(error)
                console.log("error......",error)
            } else {
                resolve(result)
                // connection.release()
                // console.log("execute resolve......",result)
            }
        })
        
      })

      return result
    })
  }
}
