module.exports = {
    any: {
      unknown: 'não é permitido',
      invalid: 'contém um valor inválido',
      empty: 'não pode estar vazio',
      required: 'é obrigatório',
      allowOnly: 'deve conter um dos seguintes valores: {{valids}}',
      default: 'lançou um erro ao executar o método padrão'
    },
    alternatives: {
      base: 'não corresponde às alternativas permitidas'
    },
    array: {
      base: 'deve ser um array',
      includes: 'o valor na posição {{pos}} não corresponde à nenhum dos tipos permitidos',
      includesSingle: 'valor único do "{{!key}}" não corresponde à nenhum dos tipos permitidos',
      includesOne: 'o valor na posição {{pos}} falhou porque {{reason}}',
      includesOneSingle: 'valor único do "{{!key}}" falhou porque {{reason}}',
      includesRequiredUnknowns: 'não contém {{unknownMisses}} o(s) valor(es) obrigatório(s)',
      includesRequiredKnowns: 'não contém {{knownMisses}}',
      includesRequiredBoth: 'não contém {{knownMisses}} e {{unknownMisses}} outro(s) valor(es) obrigatório(s)',
      excludes: 'o valor na posição {{pos}} contém um valor excluído',
      excludesSingle: 'valor único do "{{!key}}" contém um valor excluído',
      min: 'deve conter pelo menos {{limit}} itens',
      max: 'deve conter {{limit}} ou menos itens',
      length: 'deve conter exatamente {{limit}} itens',
      ordered: 'o valor na posição {{pos}} falhou porque {{reason}}',
      orderedLength: 'o valor na posição {{pos}} falhou porque o array pode ter no máximo {{limit}} itens',
      sparse: 'não deve ter valores vazios ou que representem um valor "falso"',
      unique: 'a posição {{pos}} contém um valor duplicado'
    },
    boolean: {
      base: 'deve ser um boleano'
    },
    binary: {
      base: 'deve ser um buffer ou uma string',
      min: 'deve ter no mínimo {{limit}} bytes',
      max: 'deve ter no máximo {{limit}} bytes',
      length: 'deve ter exatamente {{limit}} bytes'
    },
    date: {
      base: 'deve ser um número de milissegundos ou uma data válida',
      format: 'deve ser uma string com um dos seguintes formatos{{format}}',
      strict: 'deve ser uma data válida',
      min: 'deve ser maior ou igual a "{{limit}}"',
      max: 'deve ser menor ou igual a "{{limit}}"',
      isoDate: 'deve ser uma data ISO 8601 válida',
      timestamp: {
        javascript: 'deve ser um registro de data e hora válido ou um número de milissegundos',
        unix: 'deve ser um registro de data e hora válido ou um número de segundos'
      },
      ref: 'referencia "{{ref}}" que não é uma dados'
    },
    function: {
      base: 'deve ser uma função',
      arity: 'deve ter uma aridade de {{n}}',
      minArity: 'deve ter uma aridade maior ou igual a {{n}}',
      maxArity: 'deve ter uma aridade menor ou igual a {{n}}',
      ref: 'deve ser uma referência Joi'
    },
    lazy: {
      base: '!!schema erro: o esquema lento deve ser definido',
      schema: '!!schema erro: função de esquema lento deve retornar um esquema'
    },
    object: {
      base: 'deve ser um objeto',
      child: '!!child "{{!child}}" falha porque {{reason}}',
      min: 'deve ter pelo menos {{limite}} filhos',
      max: 'deve ter menos ou igual a {{limite}} filhos',
      length: 'deve ter {{limite}} filhos',
      allowUnknown: '!!"{{!child}}" não é permitido',
      with: 'falta de par obrigatório "{{peer}}"',
      without: 'conflito com peer proibido "{{peer}}"',
      missing: 'deve conter pelo menos um dos {{peers}}',
      xor: 'contém um conflito entre pares exclusivos {{peers}}',
      or: 'deve conter pelo menos um dos {{peers}}',
      and: 'contém {{present}} sem seus pares obrigatórios {{missing}}',
      nand: '!!"{{main}}" não deve existir simultaneamente com {{peers}}',
      assert: '!!"{{ref}}" validação falhou porque "{{ref}}" falhou em {{message}}',
      rename: {
        multiple: 'não é possível renomear filho "{{de}}" porque várias renomeações estão desabilitadas e outra chave já foi renomeada para "{{to}}"',
        override: 'não é possível renomear o filho "{{de}}" porque a substituição está desativada e o destino "{{to}}" existe'
      },
      type: 'deve ser uma instância de "{{type}}"',
      schema: 'deve ser uma instância do Joi'
    },
    number: {
      base: 'deve ser um número',
      min: 'deve ser maior ou igual a {{limite}}',
      max: 'deve ser menor ou igual a {{limite}}',
      greater: 'deve ser menor que {{limite}}',
      maior: 'deve ser maior que {{limite}}',
      float: 'deve ser um float ou double',
      integer: 'deve ser um inteiro',
      negative: 'deve ser um número negativo',
      positive: 'deve ser um número positivo',
      precision: 'não deve ter mais de {{limite}} casas decimais',
      ref: 'referencia "{{ref}}" que não é um número',
      multiple: 'deve ser um múltiplo de {{multiple}}'
    },
    string: {
      base: 'deve ser uma string',
      min: 'o comprimento deve ter pelo menos {{limite}} caracteres',
      max: 'o comprimento deve ser menor ou igual a {{limite}} caracteres',
      length: 'o comprimento deve ter {{limite}} caracteres',
      alphanum: 'deve conter apenas caracteres alfanuméricos',
      token: 'deve conter apenas caracteres alfanuméricos e de sublinhado',
      regex: {
        base: 'com o valor "{{! value}}" não corresponde ao padrão necessário: {{pattern}}',
        name: 'com o valor "{{! value}}" não corresponde ao padrão {{name}}'
      },
      email: 'deve ser um email válido',
      uri: 'deve ser um uri válido',
      uriCustomScheme: 'deve ser um uri válido com um esquema correspondente ao padrão {{scheme}}',
      isoDate: 'deve ser uma data ISO 8601 válida',
      guid: 'deve ser um GUID válido',
      hex: 'deve conter apenas caracteres hexadecimais',
      hostname: 'deve ser um nome de host válido',
      lowercase: 'deve conter apenas caracteres minúsculos',
      uppercase: 'deve conter apenas caracteres maiúsculos',
      trim: 'não deve ter espaço em branco à esquerda ou à direita',
      creditCard: 'deve ser um cartão de crédito',
      ref: 'referencia "{{ref}}" que não é um número',
      ip: 'deve ser um endereço IP válido com um {{cidr}} CIDR',
      ipVersion: 'deve ser um endereço IP válido de uma das seguintes versões {{version}} com um {{cidr}} CIDR'
    }
  }
  