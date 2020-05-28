import { Router } from 'express';
import CreateUserService from '../../services/CreateUserService';
import UsersRepository from '../typeorm/Repositories/UsersRepository';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    const usersRepository = new UsersRepository();
    const createUser = new CreateUserService(usersRepository);

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    res.json(user);
});

export default usersRouter;
