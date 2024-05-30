import { EnumValueObject } from '../../../Shared/Domain/VOs/EnumValueObject';
import { Mutable } from '../../../Shared/utils';
import { InvalidPermission } from '../Exceptions/InvalidPermission';

export type PermissionType = (typeof Permission.ValidValues)[number];

export class Permission extends EnumValueObject<PermissionType> {

    protected static readonly OPTIONS = [
        'documents:read',
        'documents:upload',
        'documents:delete',
        'documents:share',
        
        'users:read',
        'users:create',
        'users:delete',
        'users:change:permission',
    ] as const;

    public static readonly ValidValues = Permission.OPTIONS as Mutable<typeof Permission.OPTIONS>;

    constructor(_value: PermissionType) {
        super(_value, Permission.ValidValues);
    }

    protected throwErrorForInvalidValue(value: PermissionType): void {
        throw new InvalidPermission(value);
    }

}
