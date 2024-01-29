import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Either, right } from '@/core/either'

interface CreateQuestionUseCaseArgs {
  authorId: string
  title: string
  content: string
}

type CreateQuestionUseCaseResponse = Either<
  never,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    content,
    title,
  }: CreateQuestionUseCaseArgs): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      bestAnswerId: null,
      content,
      title,
      updatedAt: null,
    })

    await this.questionsRepository.create(question)

    return right({
      question,
    })
  }
}
