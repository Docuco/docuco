import { BaseEvent, BaseEventClass } from './BaseEvent';

export interface EventSubscriber {
    on(event: BaseEvent): Promise<void>;
    subscribedTo: Array<BaseEventClass>;
}
