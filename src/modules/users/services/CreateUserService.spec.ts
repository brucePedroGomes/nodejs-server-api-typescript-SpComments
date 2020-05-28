import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

test('should be able to create a new User', () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeUserRepository);

    const user = createUserService.execute({
        name: 'Pedro Gomes',
        email: 'pedroleinar@hotmail.com',
        password: '123456',
    });

    expect(user).toHaveProperty('id');
});
