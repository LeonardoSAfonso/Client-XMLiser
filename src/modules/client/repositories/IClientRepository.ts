import { Client } from '@prisma/client';
import ICreateClientDTO from '../dtos/ICreateClientDTO';
import IFilteredClientDTO from '../dtos/IFilteredClientDTO';
import IUpdateClientDTO from '../dtos/IUpdateClientDTO';

export default interface IClientRepository {
  create(data: ICreateClientDTO): Promise<Client>;
  createMany(data: ICreateClientDTO[]): Promise<string>;
  findAll(
    userId: number,
    offset: number,
    limit: number,
  ): Promise<[Client[], number]>;
  findExport(userId: number): Promise<Client[] | null>;
  find(
    userId: number,
    search: string,
    offset: number,
    limit: number,
  ): Promise<[Client[], number]>;
  findById(id: number, userId: number): Promise<Client | null>;
  findByCpf(cpf: string, userId: number): Promise<Client | null>;
  findByName(
    name: string,
    userId: number,
    offset: number,
    limit: number,
  ): Promise<[Client[], number]>;
  findByBirthday(
    initialDate: Date,
    finalDate: Date,
    userId: number,
    offset: number,
    limit: number,
  ): Promise<[Client[], number]>;
  findTotal(
    userId: number,
    filter:
      | 'name'
      | 'cpf'
      | 'marital_status'
      | 'father'
      | 'mother'
      | 'partner'
      | 'rg'
      | 'salary'
      | 'kind'
      | 'electoral_card'
      | 'gender'
      | 'cellphone'
      | 'zipcode'
      | 'street'
      | 'number'
      | 'complement'
      | 'district'
      | 'city'
      | 'email'
      | 'birthday'
      | 'user_id',
  ): Promise<IFilteredClientDTO[]>;
  update(id: number, data: IUpdateClientDTO): Promise<Client>;
  delete(id: number): Promise<string>;
}
