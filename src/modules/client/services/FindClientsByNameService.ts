import { Client } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import IClientRepository from '../repositories/IClientRepository';

export default class FindClientsByNameService {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  public async execute(
    name: string,
    userId: number,
    offset: number,
    limit: number,
  ): Promise<[Client[], number]> {
    const clients = await this.clientRepository.findByName(
      name,
      userId,
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
