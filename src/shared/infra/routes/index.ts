import { Router } from 'express';

import commentsRouter from '@modules/comments/infra/routes/comments.routes';
import usersRouter from '@modules/users/infra/routes/users.routes';
import sessionsRouter from '@modules/users/infra/routes/sessions.routes';
import upvotesRouter from '@modules/comments/infra/routes/upvotes.routes';

const routes = Router();

routes.use('/comments', commentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/upvotes', upvotesRouter);

export default routes;
