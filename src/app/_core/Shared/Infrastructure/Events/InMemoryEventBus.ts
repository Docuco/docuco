import { EventEmitter } from 'eventemitter3';
import { EventSubscriber } from '../../Domain/Events/EventSubscriber';
import { BaseEvent, BaseEventClass } from '../../Domain/Events/BaseEvent';
import { EventBus } from '../../Domain/Events/EventBus';

export class InMemoryEventBus extends EventEmitter implements EventBus {

    constructor() {
        super();
    }

    async publish(events: Array<BaseEvent>): Promise<void> {
        events.map((event) => {
            console.info(`${event.eventName}`);

            this.emit(event.eventName, event);
        });
    }

    addSubscribers(subscribers: Array<EventSubscriber>) {
        subscribers.forEach((subscriber) => {
            subscriber.subscribedTo.forEach((event) => {
                const safeSubscriber = new SafeEventSubscriberProxy(subscriber);
                this.on(event.EVENT_NAME, safeSubscriber.on.bind(safeSubscriber));
            });
        });
    }

}

class SafeEventSubscriberProxy implements EventSubscriber {

    constructor(private subscriber: EventSubscriber) {}

    async on(event: BaseEvent): Promise<void> {
        try {
            await this.subscriber.on(event);
        } catch (e) {
            console.error('[SafeEventSubscriberProxy::on] Captured error in EventSubscriber: ', e)
        }
    }

    subscribedTo: BaseEventClass[] = [];

}
