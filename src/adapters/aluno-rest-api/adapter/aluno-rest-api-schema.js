module.exports = ({ joi }) => {
    const alunoBody = joi.object().keys({
      nome: joi.string().max(45).required(),
      sobrenome: joi.string().max(45).allow([null, '']),
      cpf: joi.string().regex(/^[0-9]+/).length(11).required(),
      datanascimento: joi.date().required()
    })
    const alunoPutBody = joi.object().keys({
      id: joi.number(),
      sobrenome: joi.string().max(45).allow([null, '']),
      cpf: joi.string().regex(/^[0-9]+/).length(11).required(),
      datanascimento: joi.date().required()
    })
    const alunoQuery = joi.object().keys({
      id: joi.number(),
      nome: joi.string().max(45),
      cpf: joi.string().regex(/^[0-9]+/).length(11)
    })
  
 
    const alunoParam = joi.object().keys({
      id: joi.number().required()
    })
  
    return {
      alunoBody,
      alunoPutBody,
      alunoQuery,
      alunoParam
    }
  }
  