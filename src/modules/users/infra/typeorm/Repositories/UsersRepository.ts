import { Repository, getRepository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreate from '@modules/users/dtos/ICreateUserDTO';

export default class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async create({ name, email, password }: ICreate): Promise<User> {
        const user = this.ormRepository.create({ name, email, password });

        await this.ormRepository.save(user);
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findEmail = await this.ormRepository.findOne({ where: { email } });
        return findEmail;
    }
}
