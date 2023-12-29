import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditAnswerUseCase } from './edit-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit an answer', async () => {
    const answer = makeAnswer({
      authorId: new UniqueEntityId('author-2'),
    })
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toValue(),
      authorId: 'author-2',
      content: 'Updated Content',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(1)
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Updated Content',
    })
  })

  it('should not be able to edit an answer from different author', async () => {
    const answer = makeAnswer()
    await inMemoryAnswersRepository.create(answer)

    await expect(() =>
      sut.execute({
        answerId: answer.id.toValue(),
        authorId: 'author-2',
        content: 'Updated content',
      }),
    ).rejects.toBeInstanceOf(Error)

    expect(inMemoryAnswersRepository.items).toHaveLength(1)
  })
})
