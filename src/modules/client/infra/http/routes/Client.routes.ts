import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import Multer from 'multer';
import ClientController from '../controllers/ClientController';
import Auth from '../../../../../shared/middleware/Auth';
import Admin from '../../../../../shared/middleware/Admin';
import multerConfig from '../../../../../config/Multer';

const upload = Multer(multerConfig);

const clientRouter = Router();

const clientController = new ClientController();

clientRouter.post(
  '/client',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cpf: Joi.string().required(),
      marital_status: Joi.number().integer(),
      father: Joi.string().allow(''),
      mother: Joi.string().allow(''),
      partner: Joi.string().allow(''),
      rg: Joi.string().required(),
      salary: Joi.number().required(),
      kind: Joi.string().required(),
      electoral_card: Joi.string().required(),
      gender: Joi.string().required(),
      cellphone: Joi.string().allow(''),
      zipcode: Joi.string().required(),
      street: Joi.string().required(),
      number: Joi.string().required(),
      complement: Joi.string().allow(''),
      district: Joi.string().required(),
      city: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'br'] },
        })
        .required(),
      birthday: Joi.date().iso().required(),
    },
  }),
  Auth,
  clientController.create,
);

clientRouter.post(
  '/client-import',
  upload.single('file'),
  clientController.import,
);

clientRouter.get('/client-export', clientController.export);

clientRouter.get(
  '/clients',
  celebrate({
    [Segments.QUERY]: {
      search: Joi.string().allow(),
      offset: Joi.number().integer().required(),
      limit: Joi.number().integer().required(),
    },
  }),
  Auth,
  clientController.findAll,
);

clientRouter.get(
  '/client/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.number().integer().required() } }),
  Auth,
  clientController.findOne,
);

clientRouter.get(
  '/client-name',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().required(),
      offset: Joi.number().integer().required(),
      limit: Joi.number().integer().required(),
    },
  }),
  clientController.findByName,
);

clientRouter.get(
  '/client-birthday',
  celebrate({
    [Segments.QUERY]: {
      initial: Joi.date().iso().required(),
      final: Joi.date().iso().required(),
      offset: Joi.number().integer().required(),
      limit: Joi.number().integer().required(),
    },
  }),
  Auth,
  clientController.findByBirthday,
);

clientRouter.get(
  '/client-total',
  celebrate({
    [Segments.QUERY]: {
      filter: Joi.string().allow('city', 'gender', 'kind').required(),
    },
  }),
  Auth,
  clientController.findTotal,
);

clientRouter.put(
  '/client',
  celebrate({
    [Segments.BODY]: {
      id: Joi.number().integer().required(),
      name: Joi.string().allow(''),
      cpf: Joi.string().allow(''),
      marital_status: Joi.number().integer().allow(''),
      father: Joi.string().allow(''),
      mother: Joi.string().allow(''),
      partner: Joi.string().allow(''),
      rg: Joi.string().allow(''),
      salary: Joi.number().allow(''),
      kind: Joi.string().allow(''),
      electoral_card: Joi.string().allow(''),
      gender: Joi.string().allow(''),
      cellphone: Joi.string().allow(''),
      zipcode: Joi.string().allow(''),
      street: Joi.string().allow(''),
      number: Joi.string().allow(''),
      complement: Joi.string().allow(''),
      district: Joi.string().allow(''),
      city: Joi.string().allow(''),
      email: Joi.string().allow(''),
      birthday: Joi.date().iso().allow(''),
      user_id: Joi.number().allow(''),
      createdAt: Joi.string().allow(''),
      updatedAt: Joi.string().allow(''),
    },
  }),
  Auth,
  Admin,
  clientController.update,
);

clientRouter.delete(
  '/client/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.number().integer().required() } }),
  Auth,
  Admin,
  clientController.delete,
);

export default clientRouter;
