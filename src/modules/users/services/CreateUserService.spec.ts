import FakeUsersRepository from '../repositories/Fakes/FakeUsersRepository';
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
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '1234567',
        });

        expect(user).toHaveProperty('id');
    });
});
