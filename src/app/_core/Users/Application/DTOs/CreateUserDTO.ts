import { UserPrimitive } from "../../Domain/Primitives/UserPrimitive";

type PropsToOmit = 'id' | 'createdAt' | 'updatedAt';
export interface CreateUserDTO extends Omit<UserPrimitive, PropsToOmit> {
}
