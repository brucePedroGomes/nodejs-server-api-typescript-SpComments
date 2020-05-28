import { hash } from 'bcryptjs';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    constructor(private usersRepository: IUsersRepository) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        const findEmail = await this.usersRepository.findByEmail(email);

        if (findEmail) {
            throw new AppError('Email already used');
        }

        const hashPassword = await hash(password, 6);

        const user = await this.usersRepository.create({ name, email, password: hashPassword });

        return user;
    }
}

export default CreateUserService;
