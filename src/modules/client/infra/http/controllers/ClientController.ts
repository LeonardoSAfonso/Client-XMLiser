import { Request, Response } from 'express';
import CreateClientService from '../../../services/CreateClientService';
import DeleteClientservice from '../../../services/DeleteClientService';
import FindAllClientsService from '../../../services/FindAllClientsService';
import FindOneClientService from '../../../services/FindOneClientService';
import FindClientsService from '../../../services/FindClientsService';
import UpdateClientService from '../../../services/UpdateClientService';
import ClientRepository from '../../database/repositories/ClientRepository';
import UserRepository from '../../../../user/infra/database/repositories/UserRepository';
import FindClientsByNameService from '../../../services/FindClientsByNameService';
import FindClientsByBirthdayService from '../../../services/FindClientsByBirthdayService';
import FindTotalsService from '../../../services/FindTotalsService';
import ImportClientService from '../../../services/ImportClientService';
import DiskStorageProvider from '../../../../../shared/providers/storageProvider/implementations/DiskStorageProvider';
import ExportClientService from '../../../services/ExportClientService';

export default class ClientController {
  public async create(req: Request, res: Response): Promise<Response> {
    const clientRepository = new ClientRepository();
    const userRepository = new UserRepository();

    const {
      name,
      cpf,
      marital_status,
      father,
      mother,
      partner,
      rg,
      salary,
      kind,
      electoral_card,
      gender,
      cellphone,
      zipcode,
      street,
      number,
      complement,
      district,
      city,
      email,
      birthday,
    } = req.body;

    const createClient = new CreateClientService(
      clientRepository,
      userRepository,
    );

    const client = await createClient.execute({
      name,
      cpf,
      marital_status,
      father,
      mother,
      partner,
      rg,
      salary,
      kind,
      electoral_card,
      gender,
      cellphone,
      zipcode,
      street,
      number,
      complement,
      district,
      city,
      email,
      birthday,
      user_id: req.user.id,
    });

    return res.json(client);
  }

  public async import(req: Request, res: Response): Promise<Response> {
    const clientRepository = new ClientRepository();
    const userRepository = new UserRepository();
    const diskStorage = new DiskStorageProvider();

    const createClient = new ImportClientService(
      clientRepository,
      userRepository,
      diskStorage,
    );

    const { file } = req;

    if (!file) {
      return res.json({});
    }

    const client = await createClient.execute(file, 1);

    return res.json(client);
  }

  public async export(req: Request, res: Response): Promise<Response> {
    const clientRepository = new ClientRepository();
    const userRepository = new UserRepository();
    const diskStorage = new DiskStorageProvider();

    const createClient = new ExportClientService(
      clientRepository,
      userRepository,
      diskStorage,
    );

    const client = await createClient.execute(1);

    return res.json({ file: client });
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const clientRepository = new ClientRepository();

    const { offset, limit, search } = req.query;

    if (search) {
      const findClients = new FindClientsService(clientRepository);
      const clients = await findClients.execute(
        req.user.id,
        String(search),
        Number(offset),
        Number(limit),
      );

      return res.json(clients);
    }

    const findAllClients = new FindAllClientsService(clientRepository);

    const clients = await findAllClients.execute(
      req.user.id,
      Number(offset),
      Number(limit),
    );

    return res.json(clients);
  }

  public async findByName(req: Request, res: Response): Promise<Response> {
    const clientRepository = new ClientRepository();

    const { offset, limit, name } = req.query;

    const findClients = new FindClientsByNameService(clientRepository);
    const clients = await findClients.execute(
      String(name),
      1,
      Number(offset),
      Number(limit),
    );

    return res.json(clients);
  }

  public async findByBirthday(req: Request, res: Response): Promise<Response> {
    const clientRepository = new ClientRepository();

    const { offset, limit, initial, final } = req.query;

    const findClients = new FindClientsByBirthdayService(clientRepository);

    const clients = await findClients.execute(
      new Date(String(initial)),
      new Date(String(final)),
      req.user.id,
      Number(offset),
      Number(limit),
    );

    return res.json(clients);
  }

  public async findTotal(req: Request, res: Response): Promise<Response> {
    const clientRepository = new ClientRepository();

    const { filter } = req.query;

    const findTotal = new FindTotalsService(clientRepository);

    const client = await findTotal.execute(String(filter), req.user.id);

    return res.json(client);
  }

  public async findOne(req: Request, res: Response): Promise<Response> {
    const clientRepository = new ClientRepository();

    const { id } = req.params;

    const findOneClient = new FindOneClientService(clientRepository);

    const client = await findOneClient.execute(Number(id), req.user.id);

    return res.json(client);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const clientRepository = new ClientRepository();

    const {
      id,
      name,
      cpf,
      marital_status,
      father,
      mother,
      partner,
      rg,
      salary,
      kind,
      electoral_card,
      gender,
      cellphone,
      zipcode,
      street,
      number,
      complement,
      district,
      city,
      email,
      birthday,
    } = req.body;

    const updateClient = new UpdateClientService(clientRepository);

    const client = await updateClient.execute(
      id,
      {
        name,
        cpf,
        marital_status,
        father,
        mother,
        partner,
        rg,
        salary,
        kind,
        electoral_card,
        gender,
        cellphone,
        zipcode,
        street,
        number,
        complement,
        district,
        city,
        email,
        birthday,
      },
      req.user.id,
    );

    return res.json(client);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const clientRepository = new ClientRepository();

    const { id } = req.params;

    const deleteClient = new DeleteClientservice(clientRepository);

    const client = await deleteClient.execute(Number(id), req.user.id);

    return res.json(client);
  }
}
