import FakeUpvotesRepository from '../repositories/fakes/FakeUpvotesRepository';
import DeleteUpvoteService from './DeleteUpvoteService';
import CreateUpvoteService from './CreateUpvoteService';

let fakeUpvotesRepository: FakeUpvotesRepository;
let deleteUpvotes: DeleteUpvoteService;
let createUpvotes: CreateUpvoteService;

describe('DeleteUpvotes', () => {
    beforeEach(() => {
        fakeUpvotesRepository = new FakeUpvotesRepository();
        deleteUpvotes = new DeleteUpvoteService(fakeUpvotesRepository);
        createUpvotes = new CreateUpvoteService(fakeUpvotesRepository);
    });

    it('should be able to create a new upvotes', async () => {
        await createUpvotes.execute({
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
});
