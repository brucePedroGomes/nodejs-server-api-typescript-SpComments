import AppError from '@shared/errors/AppError';
import FakeUpvotesRepository from '../repositories/fakes/FakeUpvotesRepository';
import CreateUpvoteService from './CreateUpvoteService';

let fakeUpvotesRepository: FakeUpvotesRepository;
let createUpvotes: CreateUpvoteService;

describe('CreateUpvote', () => {
    beforeEach(() => {
        fakeUpvotesRepository = new FakeUpvotesRepository();
        createUpvotes = new CreateUpvoteService(fakeUpvotesRepository);
    });

    it('should be able to create a new upvotes', async () => {
        const upvotes = await createUpvotes.execute({
            user_id: 'user_id',
            comment_id: '40934af5-1a64-44e2-90cf-8376a7b848b3',
        });

        expect(upvotes).toHaveProperty('id');
    });

    it('votes are unique by people', async () => {
        await createUpvotes.execute({
            user_id: 'user_id',
            comment_id: '40934af5-1a64-44e2-90cf-8376a7b848b3',
        });

        await expect(
            createUpvotes.execute({
                user_id: 'user_id',
                comment_id: '40934af5-1a64-44e2-90cf-8376a7b848b3',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
