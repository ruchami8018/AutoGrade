import { User } from './User';

export type Action={
    type:'CREATE'|'UPDATE'|'GET'|'REMOVE',
    new_data:User
}