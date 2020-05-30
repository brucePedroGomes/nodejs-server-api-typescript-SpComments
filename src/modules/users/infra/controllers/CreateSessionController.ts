import { Response, Request } from 'express';

import CreateSessionsService from '../../services/CreateSessionService';
import UsersRepository from '../typeorm/Repositories/UsersRepository';

class CreateSessionController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const usersRepository = new UsersRepository();

        const createSessions = new CreateSessionsService(usersRepository);

        const { user, token } = await createSessions.execute({ email, password });

        delete user.password;

        return res.json({ user, token });
    }
}

export default CreateSessionController;
