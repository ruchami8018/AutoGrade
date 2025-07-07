import { User } from "./User";

export type Action = {
    type: 'CREATE' | 'UPDATE' | 'LOGOUT';
    new_data?: Partial<User>;
}