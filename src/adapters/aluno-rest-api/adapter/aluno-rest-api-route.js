module.exports = ({ expressValidator, alunoSchema, alunoController }) => {
    return {
      prefix: '/api/v1',
      routes: {
        get: [
          {
          path: '/aluno',
          handlers: [
            expressValidator.query(alunoSchema.alunoQuery),
            alunoController.listar
          ]
        }
      ],
        post: [
          {
          path: '/aluno',
          handlers: [
            expressValidator.body(alunoSchema.alunoBody),
            alunoController.criar
          ]
        }
      ],
        put: [
          {
          path: '/aluno',
          handlers: [
            // expressValidator.params(alunoSchema.alunoParam),
            expressValidator.body(alunoSchema.alunoPutBody),
            alunoController.atualizar
          ]
        }
      ],
        delete: [
          {
          path: '/aluno',
          handlers: [
            expressValidator.query(alunoSchema.alunoParam),
            alunoController.deletar
          ]
        }
      ]
      }
    }
  }
  