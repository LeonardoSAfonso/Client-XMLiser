import fs from 'fs';
import xmlbuilder from 'xmlbuilder';
import AppError from '../../../shared/errors/AppError';
import IStorageProvider from '../../../shared/providers/storageProvider/model/IStorageProvider';
import IUserRepository from '../../user/repositories/IUserRepository';
import IClientRepository from '../repositories/IClientRepository';

interface XMLDraft {
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
}

const apiUrl = process.env.API_URL;

export default class ExportClientService {
  constructor(
    private clientRepository: IClientRepository,
    private userRepository: IUserRepository,
    private storageProvider: IStorageProvider,
  ) {
    this.clientRepository = clientRepository;
    this.userRepository = userRepository;
    this.storageProvider = storageProvider;
  }

  public async execute(userId: number): Promise<string> {
    if (fs.existsSync('./tmp/clientes.xml')) {
      await this.storageProvider.deleteFile('clientes.xml');
    }

    const checkUserExist = await this.userRepository.findById(userId, 0);

    if (!checkUserExist) {
      throw new AppError('ERRO: Nenhum usuário encontrado');
    }

    const clients = await this.clientRepository.findExport(userId);

    if (!clients) {
      throw new AppError('ERRO: nenhum cliente encontrado.', 404);
    }

    const draftClients: {
      Registros: {
        Item: XMLDraft[];
      };
    } = {
      Registros: { Item: [] },
    };

    clients.forEach(client => {
      draftClients.Registros.Item.push({
        Nome: client.name,
        CPF: client.cpf,
        EstadoCivil: String(client.marital_status),
        Pai: client.father || '',
        Mae: client.mother || '',
        Conjuge: client.partner || '',
        RG: client.rg,
        Salario: Number(client.salary).toLocaleString('pt-br', {
          minimumFractionDigits: 2,
        }),
        Especie: client.kind,
        TitulodeEleitor: client.electoral_card,
        Sexo: client.gender,
        Celular: client.cellphone || '',
        CEP: client.zipcode,
        Endereco: client.street,
        Complemento: client.complement || '',
        N: client.number,
        Bairro: client.district,
        Email: client.email,
        Cidade: client.city,
        Datadenascimento: client.birthday
          ? client.birthday.toLocaleDateString()
          : '',
      });
    });

    const writer = xmlbuilder.stringWriter();

    const xmlClients = xmlbuilder
      .create(draftClients, {
        invalidCharReplacement: '',
      })
      .end(writer);

    // const xmlClients = builder.buildObject(draftClients);

    fs.writeFile('./tmp/clientes.xml', xmlClients, err => {
      if (err) throw err;
      console.log('File is created successfully.');
    });

    return `${apiUrl}/files/clientes.xml`;
  }
}
