import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })
    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toValue(),
      authorId: 'author-1',
      content: 'This is the updated content',
      title: 'Updated title',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(1)
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Updated title',
      content: 'This is the updated content',
    })
  })

  it('should not be able to edit a question from different author', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })
    await inMemoryQuestionsRepository.create(question)

    const result = await sut.execute({
      questionId: question.id.toValue(),
      authorId: 'author-2',
      content: 'random',
      title: 'random',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(inMemoryQuestionsRepository.items).toHaveLength(1)
  })
})
