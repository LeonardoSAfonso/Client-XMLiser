import { Client } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import IUpdateClientDTO from '../dtos/IUpdateClientDTO';
import IClientRepository from '../repositories/IClientRepository';

export default class UpdateClientService {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  public async execute(
    id: number,
    data: IUpdateClientDTO,
    userId: number,
  ): Promise<Client> {
    const client = await this.clientRepository.findById(id, userId);

    if (!client) {
      throw new AppError('ERRO: Nenhum cliente foi encontrado.', 404);
    }

    const updatedClient = await this.clientRepository.update(client.id, data);

    return updatedClient;
  }
}
