import { Response, Request } from 'express';

import CreateUserService from '../../services/CreateUserService';
import UsersRepository from '../typeorm/Repositories/UsersRepository';

class CreateUsersController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        const usersRepository = new UsersRepository();
        const createUser = new CreateUserService(usersRepository);

        const user = await createUser.execute({ name, email, password });

        delete user.password;

        return res.json(user);
    }
}

export default CreateUsersController;
