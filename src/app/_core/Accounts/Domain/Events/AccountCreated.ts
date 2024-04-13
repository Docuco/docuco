import { CreateDomainEventParams, DomainEvent } from '../../../Shared/Domain/Events/DomainEvent';
import { AccountPrimitive } from '../Primitives/AccountPrimitive';

type Attributes = AccountPrimitive

type Params = CreateDomainEventParams & {
    attributes: Attributes;
};

export class AccountCreated extends DomainEvent {

    static readonly EVENT_NAME = 'docuco.accounts.account.created';

    readonly attributes: Attributes;

    constructor(params: Params) {
        const { entityId, eventId, occurredOn, attributes } = params;

        super({ eventName: AccountCreated.EVENT_NAME, entityId, eventId, occurredOn });
        this.attributes = attributes;
    }

}
