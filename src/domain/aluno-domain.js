module.exports = class AlunoDomain {
    constructor ({ alunoDb }) {
      this.model = {}
      this.db = alunoDb
    }
  
    refresh (obj) {
      this.model = obj
      return this
    }
  
    async criar () {
      this.model.id = await this.db.criar({
        ...this.model,  cpf: this.model.cpf.padStart(11, 0)
      })
  
      return this.model
    }
  
    async atualizar () {
      await this.db.atualizar({
        ...this.model,  cpf: this.model.cpf.padStart(11, 0)
      })
  
      return this.model
    }

    async deletar () {
      return this.db.deletar(this.id)
    }

  }
  