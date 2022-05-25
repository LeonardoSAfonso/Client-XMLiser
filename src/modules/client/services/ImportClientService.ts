import fs from 'fs';
import path from 'path';
import xml2js from 'xml2js';
import { DOMParser } from 'xmldom';
import AppError from '../../../shared/errors/AppError';
import IStorageProvider from '../../../shared/providers/storageProvider/model/IStorageProvider';
import IUserRepository from '../../user/repositories/IUserRepository';
import ICreateClientDTO from '../dtos/ICreateClientDTO';
import IXMLParsedDTO from '../dtos/IXMLParsedDTO';
import IClientRepository from '../repositories/IClientRepository';

export default class ImportClientService {
  constructor(
    private clientRepository: IClientRepository,
    private userRepository: IUserRepository,
    private storageProvider: IStorageProvider,
  ) {
    this.clientRepository = clientRepository;
    this.userRepository = userRepository;
    this.storageProvider = storageProvider;
  }

  public async execute(
    file: Express.Multer.File,
    userId: number,
  ): Promise<string> {
    const checkUserExist = await this.userRepository.findById(userId, 0);

    if (!checkUserExist) {
      throw new AppError('ERRO: Nenhum usuário encontrado');
    }

    const parser = new xml2js.Parser({
      attrkey: 'ATTR',
      explicitArray: false,
      mergeAttrs: true,
    });

    const xml_string = fs.readFileSync(
      path.resolve(__dirname, `../../../../tmp/${file.filename}`),
      'utf8',
    );

    const valid = xml_string.replace(/Nº/g, 'N');

    const xmlStringSerialized = new DOMParser().parseFromString(
      valid,
      'text/xml',
    );

    const clients = [] as ICreateClientDTO[];

    parser.parseString(
      xmlStringSerialized,
      (error: unknown, result: IXMLParsedDTO) => {
        if (error === null) {
          result.registros.item.forEach(item => {
            const date = item.Datadenascimento
              ? item.Datadenascimento.split(' ')[0].split('/')
              : undefined;
            clients.push({
              name: item.Nome,
              cpf: item.CPF,
              marital_status: Number(item.EstadoCivil),
              father: item.Pai,
              mother: item.Mae,
              partner: item.Conjuge,
              rg: item.RG,
              salary: Number(item.Salario.replace('.', '').replace(',', '.')),
              kind: item.Especie,
              electoral_card: item.TitulodeEleitor,
              gender: item.Sexo,
              cellphone: item.Celular,
              zipcode: item.CEP,
              street: item.Endereco,
              number: item.N,
              complement: item.Complemento,
              district: item.Bairro,
              city: item.Cidade,
              email: item.Email,
              birthday: date
                ? new Date(`${date[2]}-${date[1]}-${date[0]}`)
                : date,
              user_id: userId,
            });
          });
        } else {
          console.log(error);
          throw new AppError(`ERRO: Falha ao carregar o XML.`, 400);
        }
      },
    );

    if (!clients.length) {
      throw new AppError('ERRO: Não há clientes para importação.', 404);
    }

    const createdClients = await this.clientRepository.createMany(clients);

    await this.storageProvider.deleteFile(file.filename);

    return createdClients;
  }
}
