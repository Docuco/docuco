import { EnumValueObject } from './EnumValueObject';
import { Mutable } from './Mutable';
import { InvalidPermission } from '../Exceptions/InvalidPermission';

export type PermissionType = (typeof Permission.ValidValues)[number];

export class Permission extends EnumValueObject<PermissionType> {

    protected static readonly OPTIONS = [
        'documents:read',
        'documents:upload',
        'documents:delete',
        'documents:restore',
        'documents:share',
        
        'users:read',
        'users:create',
        'users:delete',
        'users:change:permission',

        'apikey:read',
        'apikey:create',
        'apikey:delete',
        'apikey:update',
        'apikey:change:permission',
    ] as const;

    public static readonly ValidValues = Permission.OPTIONS as Mutable<typeof Permission.OPTIONS>;

    constructor(_value: PermissionType) {
        super(_value, Permission.ValidValues);
    }

    protected throwErrorForInvalidValue(value: PermissionType): void {
        throw new InvalidPermission(value);
    }

}
