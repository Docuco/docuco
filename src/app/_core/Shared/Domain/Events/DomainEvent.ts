import { BaseEvent, EventPrimitives, CreateNamedEventParams, CreateEventParams } from './BaseEvent';

type DomainEventNecessaryParameters = {
    entityId: string;
};

export interface DomainEventPrimitives<AttributesType> extends EventPrimitives<AttributesType> {
    entityId: string;
}

export type CreateDomainEventParams = CreateEventParams & DomainEventNecessaryParameters;

type CreateNamedDomainEventParams = CreateNamedEventParams & DomainEventNecessaryParameters;
export abstract class DomainEvent extends BaseEvent {

    readonly entityId: string;

    constructor(params: CreateNamedDomainEventParams) {
        const { entityId, eventName, eventId, occurredOn } = params;
        super({ eventName, eventId, occurredOn });
        this.entityId = entityId;
    }

    // abstract toPrimitives(): DomainEventPrimitives<unknown>;

}
