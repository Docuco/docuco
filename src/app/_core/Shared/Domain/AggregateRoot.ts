import { DomainEvent } from './Events/DomainEvent';

export abstract class AggregateRoot {

    private domainEvents: Array<DomainEvent>;

    constructor() {
        this.domainEvents = [];
    }

    pullDomainEvents(): Array<DomainEvent> {
        const domainEvents = this.domainEvents.slice();
        this.domainEvents = [];

        // TODO: Returned sorted by occuredOn?
        return domainEvents;
    }

    record(event: DomainEvent): void {
        this.domainEvents.push(event);
    }

    abstract toPrimitives(): any;

}