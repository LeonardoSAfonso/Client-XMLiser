import { User } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import IHashProvider from '../../../shared/providers/hashProvider/model/IHashProvider';
import ICreateUserDTO from '../dtos/ICreateUseDTO';
import IUserRepository from '../repositories/IUserRepository';

export default class CreateUserService {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
  ) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({
    name,
    email,
    password,
    access_level,
  }: ICreateUserDTO): Promise<User> {
    const checkUserEmailExist = await this.userRepository.findByEmail(email);

    if (checkUserEmailExist) {
      throw new AppError(
        'ERRO: O endereço de e-mail já está sendo utilizado',
        409,
      );
    }

    const hashed = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashed,
      access_level,
    });

    return user;
  }
}
