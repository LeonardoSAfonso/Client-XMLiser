export default interface IXMLParsedDTO {
  registros: {
    item: {
      Nome: string;
      CPF: string;
      EstadoCivil: string;
      Pai?: string;
      Mae?: string;
      Conjuge?: string;
      RG: string;
      Salario: string;
      Especie: string;
      TitulodeEleitor: string;
      Sexo: string;
      Celular: string;
      CEP: string;
      Endereco: string;
      Complemento?: string;
      N: string;
      Bairro: string;
      Email: string;
      Cidade: string;
      Datadenascimento: string;
    }[];
  };
}
