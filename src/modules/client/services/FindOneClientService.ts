import { Client } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import IClientRepository from '../repositories/IClientRepository';

export default class FindOneClientService {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  public async execute(id: number, userId: number): Promise<Client> {
    const client = await this.clientRepository.findById(id, userId);

    if (!client) {
      throw new AppError('ERRO: Nenhum cliente foi encontrado.', 404);
    }

    return client;
  }
}
