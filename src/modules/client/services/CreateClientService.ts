import { Client } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import IUserRepository from '../../user/repositories/IUserRepository';
import ICreateClientDTO from '../dtos/ICreateClientDTO';
import IClientRepository from '../repositories/IClientRepository';

export default class CreateClientService {
  constructor(
    private clientRepository: IClientRepository,
    private userRepository: IUserRepository,
  ) {
    this.clientRepository = clientRepository;
    this.userRepository = userRepository;
  }

  public async execute(data: ICreateClientDTO): Promise<Client> {
    const checkUserExist = await this.userRepository.findById(data.user_id, 0);

    if (!checkUserExist) {
      throw new AppError('ERRO: Usuário não encontrado.', 404);
    }

    const checkClientCpfExist = await this.clientRepository.findByCpf(
      data.cpf,
      data.user_id,
    );

    if (checkClientCpfExist) {
      throw new AppError('ERRO: Este CPF já está sendo utilizado', 409);
    }

    const client = await this.clientRepository.create(data);

    return client;
  }
}
