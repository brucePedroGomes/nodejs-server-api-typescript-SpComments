import { Router } from 'express';
import CreateSessionsService from '../../services/CreateSessionService';
import UsersRepository from '../typeorm/Repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
    const { email, password } = req.body;

    const usersRepository = new UsersRepository();

    const createSessions = new CreateSessionsService(usersRepository);

    const { user, token } = await createSessions.execute({ email, password });

    delete user.password;

    res.json({ user, token });
});

export default sessionsRouter;
