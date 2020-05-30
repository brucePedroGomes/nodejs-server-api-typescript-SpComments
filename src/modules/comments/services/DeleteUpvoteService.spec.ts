import AppError from '@shared/errors/AppError';
import FakeUpvotesRepository from '../repositories/fakes/FakeUpvotesRepository';
import DeleteUpvoteService from './DeleteUpvoteService';

let fakeUpvotesRepository: FakeUpvotesRepository;
let deleteUpvotes: DeleteUpvoteService;

describe('DeleteUpvotes', () => {
    beforeEach(() => {
        fakeUpvotesRepository = new FakeUpvotesRepository();
        deleteUpvotes = new DeleteUpvoteService(fakeUpvotesRepository);
    });

    it('should be able to delete a upvotes', async () => {
        await fakeUpvotesRepository.create({
            user_id: 'user_id',
            comment_id: '40934af5-1a64-44e2-90cf-8376a7b848b3',
        });

        await deleteUpvotes.execute({
            user_id: 'user_id',
            comment_id: '40934af5-1a64-44e2-90cf-8376a7b848b3',
        });

        const upvotes = await fakeUpvotesRepository.findUserIdCommentId({
            user_id: 'user_id',
            comment_id: '40934af5-1a64-44e2-90cf-8376a7b848b3',
        });

        expect(upvotes).toBeFalsy();
    });

    it('the user can only delete his own vote', async () => {
        await fakeUpvotesRepository.create({
            user_id: 'user_id',
            comment_id: '40934af5-1a64-44e2-90cf-8376a7b848b3',
        });

        await expect(
            deleteUpvotes.execute({
                user_id: 'invalid_user_id',
                comment_id: '40934af5-1a64-44e2-90cf-8376a7b848b3',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
