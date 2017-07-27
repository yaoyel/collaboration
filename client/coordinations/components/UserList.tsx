import * as React from 'react';
import {User} from '../model';
import UserCom from './User';
interface UserListProps
{
    Users:User[]
}

class UserList extends React.Component<UserListProps,void> {
    constructor(props,ctx)
    {
        super(props,ctx);
    }

    render(){
        return(<div>{this.props.Users.map(p=><UserCom user={p} key={Math.random()}/>)}</div>);
    }

}

export default UserList;