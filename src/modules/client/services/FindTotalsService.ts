import AppError from '../../../shared/errors/AppError';
import IFilteredClientDTO from '../dtos/IFilteredClientDTO';
import IClientRepository from '../repositories/IClientRepository';

export default class FindTotalsService {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  public async execute(
    filter: any,
    userId: number,
  ): Promise<IFilteredClientDTO[]> {
    const client = await this.clientRepository.findTotal(userId, filter);

    if (!client) {
      throw new AppError('ERRO: Nenhum cliente foi encontrado.', 404);
    }

    return client;
  }
}
