import AppError from '../../../shared/errors/AppError';
import IClientRepository from '../repositories/IClientRepository';

export default class DeleteClientservice {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  public async execute(id: number, userId: number): Promise<string> {
    const checkClientExist = await this.clientRepository.findById(id, userId);

    if (!checkClientExist) {
      throw new AppError('ERRO: Nenhum cliente foi encontrado.', 404);
    }

    const client = await this.clientRepository.delete(id);

    return client;
  }
}
