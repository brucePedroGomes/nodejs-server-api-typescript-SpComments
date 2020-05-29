import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        createUser = new CreateUserService(fakeUsersRepository);
    });

    it('should be able to create a new User', async () => {
        const user = await createUser.execute({
            name: 'Pedro Gomes',
            email: 'pedro@email.com',
            password: '1234567',
        });

        expect(user).toHaveProperty('id');
        expect(user.name).toBe('Pedro Gomes');
    });

    it('should be able to create a new user with same email', async () => {
        await createUser.execute({
            name: 'Pedro Gomes',
            email: 'pedro@email.com',
            password: '1234567',
        });

        await expect(
            createUser.execute({
                name: 'Pedro Gomes',
                email: 'pedro@email.com',
                password: '1234567',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
