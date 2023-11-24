import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      content: "Yes, it's possible to create questions",
      instructorId: 'instructor-01',
      questionId: 'question-01',
    })

    expect(answer.content).toEqual("Yes, it's possible to create questions")
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})
