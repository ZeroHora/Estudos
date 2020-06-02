module.exports = ({ alunoDomain, alunoDb }) => {
  
  const listar = async (req, res, next) => {
    try {
          return res.json(             
                           await alunoDb.listar( req.query)
                         )
    } catch (erro) {
      console.log("erro listar", erro)
      next(erro)
    }
  }

  const criar = async (req, res, next) => {
      try {
        console.log("req.body",req.body)
        return res.json(
                        await alunoDomain.refresh(req.body).criar()
                       )
      } catch (erro) {
        next(erro)
      }
  }

  const atualizar = async (req, res, next) => {
      try {
        console.log("atualizar req.body",req.body)
        return res.json(
              //  await alunoDomain.refresh( {...req.body} ).atualizar()
                await alunoDomain.refresh(req.body).atualizar()
                )
      } catch (erro) {
        next(erro)
      }
  }

  const deletar = async (req, res, next) => {
      try {
            return res.json(             
                             await alunoDb.deletar( req.query.id)
                            //  await alunoDomain.deletar( req.query.id)
                            //  await alunoDomain.refresh(req.query.id).deletar()
                           )
      } catch (erro) {
           console.log("erro deletar", erro)
        next(erro)
      }
  }

  return {
      listar,
      criar,
      atualizar,
      deletar
      
    }
}
  
// const _converterRequisicaoData = (aluno) => {
//   const dataNascimento = {
//     'DataNascimento': `/Date(${moment.utc(aluno.datanascimento).format('x')})/`
//   }

//   return dataNascimento
// }
