import { Client } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import IClientRepository from '../repositories/IClientRepository';

export default class FindClientsService {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  public async execute(
    userId: number,
    search: string,
    offset: number,
    limit: number,
  ): Promise<[Client[], number]> {
    const clients = await this.clientRepository.find(
      userId,
      search,
      offset,
      limit,
    );

    if (!clients[0]?.length) {
      throw new AppError('ERRO: Nenhum cliente foi encontrado.', 404);
    }

    const totalPage =
      clients[1] % limit === 0
        ? clients[1] / limit
        : parseInt(`${clients[1] / limit}`, 10) + 1;

    return [clients[0], totalPage];
  }
}
