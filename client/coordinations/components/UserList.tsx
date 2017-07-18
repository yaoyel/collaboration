import * as React from 'react';
import {User} from '../model';
import UserCom from './User';
interface UserListProps
{
    Users:User[]
}

const UserList:React.SFC<UserListProps>=(props)=>{
    return(<div>{props.Users.forEach(p=><UserCom user={p}/>)}</div>);
}

export default UserList;