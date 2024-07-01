import { Id } from "../VOs/Id";

export interface EventPrimitives<AttributesType> {
  eventId: string;
  eventName: string;
  occurredOn: Date;
  attributes: AttributesType;
}

export type CreateNamedEventParams = {
  eventName: string;
  eventId?: string;
  occurredOn?: Date;
};

export type CreateEventParams = Omit<CreateNamedEventParams, 'eventName'>;

export abstract class BaseEvent {

    public static readonly EVENT_NAME: string;

    readonly eventId: string;

    readonly occurredOn: Date;

    readonly eventName: string;

  readonly abstract attributes: unknown;

  constructor(params: CreateNamedEventParams) {
      const { eventName, eventId, occurredOn } = params;
      this.eventName = eventName;
      this.eventId = eventId || Id.new().value;
      this.occurredOn = occurredOn || new Date();
  }

    // abstract toPrimitives(): EventPrimitives<unknown>;

    // public isSameAs<EventType extends BaseEvent>(eventType: BaseEvent): this is EventType {
    //     return this.eventName === eventType.class.EVENT_NAME;
    // }

}

export type BaseEventClass = {
  EVENT_NAME: string;
};

export function isEventType<EventType extends BaseEvent>(
    event: BaseEvent,
    eventType: BaseEventClass,
): event is EventType {
    return event.eventName === eventType.EVENT_NAME;
}
