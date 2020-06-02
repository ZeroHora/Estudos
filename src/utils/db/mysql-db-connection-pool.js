module.exports = class MysqlDbConnectionPool {
    constructor ({ dbPoolConnectionConfig, mysqldb }) {
      this.mysqldb = mysqldb
      this.dbPoolConnectionConfig = dbPoolConnectionConfig
      // this.pool  = this.mysqldb.createPool(this.dbPoolConnectionConfig)
    }
  
    async _getConnection () {
      const conectdb = this.mysqldb.createConnection(this.dbPoolConnectionConfig)
      // const conectdb = this.pool.getConnection(this.dbPoolConnectionConfig)
      // const conectdb = this.mysqldb.createPool(this.dbPoolConnectionConfig)
      console.log("Database conectado com sucesso!!!", conectdb.threadId)
      return conectdb
    }
    
    // pool.getConnection(function(err, connection) {
    //   // Use the connection
    //    connection.query( 'SELECT * from employees', function(err, rows) {
    //   // And done with the connection.
    //      console.log(rows[0]);
    //      connection.release();
    //   // Don't use the connection here, it has been returned to the pool.
    //    });
    //  });

    async wrapConnection (commit, callback) {
      const connection = await this._getConnection()
     
      if (connection) {
        // console.log("conectado db sim...", connection)
        try {
          const result = await callback(connection)
          if (commit) {           
             commit = false
             await connection.commit()
             console.log("conectado db sim , comitou...")
          }
          return result
          
        } catch (error) {
          if (commit) {
            await connection.rollback()
          }
          console.log("conectado db sim com erro..rollback.", error)
          throw error
        } finally {
          console.log("Fechando conexão Database...")
          if (commit) {
            console.log("Fechando conexão Database, vai comitar...")
            commit = false
            await connection.commit()
          }
          await connection.end()
        }
      } else {
        connection.destroy()
        console.log("Ocorreu um erro ao tentar obter uma conexão com o banco de dados:...", connection)
        throw new Error('Ocorreu um erro ao tentar obter uma conexão com o banco de dados: ' + connection)
      }
    }
  }
  