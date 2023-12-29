import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })
    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toValue(),
      authorId: 'author-1',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from different author', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })
    await inMemoryQuestionsRepository.create(question)

    await expect(() =>
      sut.execute({
        questionId: question.id.toValue(),
        authorId: 'author-2',
      }),
    ).rejects.toBeInstanceOf(Error)

    expect(inMemoryQuestionsRepository.items).toHaveLength(1)
  })
})
