import { BaseEvent } from './BaseEvent';
import { EventSubscriber } from './EventSubscriber';

export interface EventBus {
    publish(events: Array<BaseEvent>): Promise<void>;
    addSubscribers(subscribers: Array<EventSubscriber>): void;
}
