import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'
import { Answer } from '../entities/answer'

export class AnswerCreatedEvent implements DomainEvent {
  public ocurredAt: Date

  constructor(private answer: Answer) {
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.answer.id
  }
}
