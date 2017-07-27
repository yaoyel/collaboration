import {Doc,Lock} from './doc';
import {User} from './user';

export {Doc,Lock};
export {User};



export type IState={
 Users:User[],
 Doc:Doc,
 Locks:Lock[]
};

