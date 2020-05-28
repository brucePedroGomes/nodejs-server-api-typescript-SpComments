import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SessionService from './CreateSessionService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let sessionService: SessionService;
let createUser: CreateUserService;

describe('AsessionService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        sessionService = new SessionService(fakeUsersRepository);
        createUser = new CreateUserService(fakeUsersRepository);
    });

    it('should not be able to authenticate with wrong password', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '1234567',
        });

        await expect(
            sessionService.execute({
                email: 'johndoe@email.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('shoud not be able to authenticate with no existing user', async () => {
        await expect(
            sessionService.execute({
                email: 'pedrogomes@email.com',
                password: '1234567',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to authenticate', async () => {
        const user = await createUser.execute({
            name: 'Pedro Gomes',
            email: 'pedro@email.com',
            password: '1234567',
        });

        const response = await sessionService.execute({
            email: 'pedro@email.com',
            password: '1234567',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });
});
