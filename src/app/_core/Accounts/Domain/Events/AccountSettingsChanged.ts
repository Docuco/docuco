import { CreateDomainEventParams, DomainEvent } from '../../../Shared/Domain/Events/DomainEvent';
import { AccountPrimitive } from '../Primitives/AccountPrimitive';

type Attributes = AccountPrimitive

type Params = CreateDomainEventParams & {
    attributes: Attributes;
};

export class AccountSettingsChanged extends DomainEvent {

    static readonly EVENT_NAME = 'docuco.accounts.settings.changed';

    readonly attributes: Attributes;

    constructor(params: Params) {
        const { entityId, eventId, occurredOn, attributes } = params;

        super({ eventName: AccountSettingsChanged.EVENT_NAME, entityId, eventId, occurredOn });
        this.attributes = attributes;
    }

}
