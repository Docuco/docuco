import { anything, capture, instance, mock, reset, verify } from 'ts-mockito';
import { EventBus } from '../../../../../app/_core/Shared/Domain/Events/EventBus';
import { BaseEvent, BaseEventClass, isEventType } from '../../../../../app/_core/Shared/Domain/Events/BaseEvent';

export class EventBusMock {

    private eventBusMock: EventBus;

    constructor() {
        this.eventBusMock = mock<EventBus>();
    }

    public get mockito() {
        return this.eventBusMock;
    }

    public instance() {
        return instance(this.eventBusMock);
    }

    public reset() {
        reset(this.eventBusMock);
    }

    private getPublishedEvents(): BaseEvent[] {
        const amountOfExecutionsToCheck = Infinity;

        const allEvents: BaseEvent[] = [];

        const executions = capture(this.eventBusMock.publish);
        for (let index = 0; index < amountOfExecutionsToCheck; index++) {
            try {
                const [events] = executions.byCallIndex(index);

                allEvents.push(...events);
            } catch (error) {
                break;
            }
        }

        return allEvents;
    }

    public getPublishedEventByName(eventType: BaseEventClass): BaseEvent | undefined {
        const allEvents = this.getPublishedEvents();

        return allEvents.find((publishedEvent) => isEventType(publishedEvent, eventType));
    }

    public expectEventToHaveBeenPublishedWithAttributes(
        event: BaseEventClass,
        attributes: Record<string, unknown>,
    ) {
        const foundEvent = this.getPublishedEventByName(event);
        expect(foundEvent?.attributes).toMatchObject(attributes);
    }

    public expectEventToHaveBeenPublished(event: BaseEventClass) {
        const foundEvent = this.getPublishedEventByName(event);
        expect(foundEvent).toBeTruthy();
    }

    public expectPublishNotToHaveBeenCalled() {
        verify(this.eventBusMock.publish(anything())).never();
    }

    public expectZeroEventsPublished() {
        this.expectEventsPublished(0);
    }

    public expectEventsPublished(numberOfEvents: number) {
        const allEvents = this.getPublishedEvents();
        expect(allEvents.length).toBe(numberOfEvents);
    }

    public expectEventNotPublished(event: BaseEventClass) {
        const eventFound = this.getPublishedEventByName(event);

        expect(eventFound).toBeFalsy();
    }

}