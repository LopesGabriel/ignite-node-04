import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async findById(id: string): Promise<Question | null> {
    return this.items.find((question) => question.id.toValue() === id) ?? null
  }

  async findBySlug(slug: string) {
    const question = this.items.find((question) => question.slug.value === slug)

    return question ?? null
  }

  async create(question: Question) {
    this.items.push(question)
  }

  async save(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((q) => q.id === question.id)

    this.items[itemIndex] = question
  }

  async delete(question: Question): Promise<void> {
    this.items = this.items.filter(
      (q) => q.id.toValue() !== question.id.toValue(),
    )
  }
}
