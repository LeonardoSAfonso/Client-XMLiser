import { Client } from '@prisma/client';
import prisma from '../../../../../prisma';
import ICreateClientDTO from '../../../dtos/ICreateClientDTO';
import IFilteredClientDTO from '../../../dtos/IFilteredClientDTO';
import IUpdateClientDTO from '../../../dtos/IUpdateClientDTO';
import IClientRepository from '../../../repositories/IClientRepository';

export default class ClientRepository implements IClientRepository {
  public async create(data: ICreateClientDTO): Promise<Client> {
    const client = await prisma.client.create({ data });

    await prisma.$disconnect();
    return client;
  }

  public async createMany(data: ICreateClientDTO[]): Promise<string> {
    await prisma.client.createMany({
      data,
      skipDuplicates: true,
    });

    await prisma.$disconnect();

    return 'Clientes criados com sucesso';
  }

  public async findAll(
    userId: number,
    offset: number,
    limit: number,
  ): Promise<[Client[], number]> {
    const elements = await prisma.client.count({
      where: { user_id: userId },
    });
    const users = await prisma.client.findMany({
      where: { user_id: userId },
      orderBy: { id: 'desc' },
      skip: offset,
      take: limit,
    });

    await prisma.$disconnect();
    return [users, elements];
  }

  public async findExport(userId: number): Promise<Client[] | null> {
    const users = await prisma.client.findMany({
      where: { user_id: userId },
    });

    await prisma.$disconnect();
    return users;
  }

  public async find(
    userId: number,
    search: string,
    offset: number,
    limit: number,
  ): Promise<[Client[], number]> {
    const elements = await prisma.client.count({
      where: {
        user_id: userId,
        OR: [
          {
            email: {
              contains: search,
            },
          },
          {
            name: {
              contains: search,
            },
          },
        ],
      },
    });

    const users = await prisma.client.findMany({
      where: {
        user_id: userId,
        OR: [
          {
            email: {
              contains: search,
            },
          },
          {
            name: {
              contains: search,
            },
          },
        ],
      },
      orderBy: { id: 'desc' },
      skip: offset,
      take: limit,
    });

    await prisma.$disconnect();
    return [users, elements];
  }

  public async findById(id: number, userId: number): Promise<Client | null> {
    const client = await prisma.client.findFirst({
      where: { id, user_id: userId },
    });

    await prisma.$disconnect();
    return client;
  }

  public async findByCpf(cpf: string, userId: number): Promise<Client | null> {
    const client = await prisma.client.findFirst({
      where: { cpf, user_id: userId },
    });

    await prisma.$disconnect();
    return client;
  }

  public async findByName(
    name: string,
    userId: number,
    offset: number,
    limit: number,
  ): Promise<[Client[], number]> {
    const elements = await prisma.client.count({
      where: {
        user_id: userId,
        name: {
          contains: name,
        },
      },
    });

    const client = await prisma.client.findMany({
      where: {
        user_id: userId,
        name: {
          contains: name,
        },
      },
      orderBy: { id: 'asc' },
      take: limit,
      skip: offset,
    });

    await prisma.$disconnect();
    return [client, elements];
  }

  public async findByBirthday(
    initialDate: Date,
    finalDate: Date,
    userId: number,
    offset: number,
    limit: number,
  ): Promise<[Client[], number]> {
    const elements = await prisma.client.count({
      where: {
        user_id: userId,
        birthday: {
          gte: initialDate,
          lte: finalDate,
        },
      },
    });

    const client = await prisma.client.findMany({
      where: {
        user_id: userId,
        birthday: {
          gte: initialDate,
          lte: finalDate,
        },
      },
      orderBy: { id: 'desc' },
      take: limit,
      skip: offset,
    });

    await prisma.$disconnect();
    return [client, elements];
  }

  public async findTotal(
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
  ): Promise<IFilteredClientDTO[]> {
    const client = await prisma.client.groupBy({
      by: [filter],
      where: {
        user_id: userId,
      },
      _sum: {
        salary: true,
      },
      _count: {
        id: true,
      },
    });

    await prisma.$disconnect();

    // eslint-disable-next-line array-callback-return
    const filteredClients = client.reduce<IFilteredClientDTO[]>(function x(
      prevValue,
      current,
    ): IFilteredClientDTO[] {
      prevValue.push({
        [filter]: current[filter],
        sumSalaries: Number(current._sum.salary),
        totalElements: current._count.id,
      });

      return prevValue;
    },
    []);

    return filteredClients;
  }

  public async update(id: number, data: IUpdateClientDTO): Promise<Client> {
    const updatedClient = await prisma.client.update({ where: { id }, data });

    await prisma.$disconnect();
    return updatedClient;
  }

  async delete(id: number): Promise<string> {
    await prisma.client.delete({ where: { id } });

    return 'Cliente deletado com sucesso.';
  }
}
