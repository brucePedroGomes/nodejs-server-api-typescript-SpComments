import { uuid } from 'uuidv4';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '../IUsersRepository';
import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: uuid() }, userData);

        this.users.push(user);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);

        return findUser;
    }
}

export default FakeUsersRepository;
