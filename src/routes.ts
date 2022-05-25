import { Router } from 'express';
import clientRouter from './modules/client/infra/http/routes/Client.routes';
import sessionsRouter from './modules/user/infra/http/routes/Session.routes';
import userRouter from './modules/user/infra/http/routes/User.routes';

const routes = Router();

routes.use('/', userRouter);
routes.use('/', sessionsRouter);
routes.use('/', clientRouter);

export default routes;
