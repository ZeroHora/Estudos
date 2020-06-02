module.exports = class OracleDbConnectionPool {
    constructor ({ dbPoolConnectionConfig, oracledb }) {
      this.oracledb = oracledb
      this.NUMBER = oracledb.NUMBER
      this.BIND_OUT = oracledb.BIND_OUT
      this.dbPoolConnectionConfig = dbPoolConnectionConfig
      oracledb.outFormat = oracledb.OBJECT
    }
  
    async _getConnection () {
      return this.oracledb.getConnection(this.dbPoolConnectionConfig)
    }
  
    async wrapConnection (commit, callback) {
      const connection = await this._getConnection()
  
      if (connection) {
        try {
          const result = await callback(connection)
          if (commit) {
            await connection.commit()
          }
          return result
        } catch (error) {
          if (commit) {
            await connection.rollback()
          }
          throw error
        } finally {
          await connection.close()
        }
      } else {
        throw new Error('Ocorreu um erro ao tentar obter uma conexão com o banco de dados: ' + connection)
      }
    }
  }
  