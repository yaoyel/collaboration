import * as React from 'react';
import {User as userModel} from '../model/user';

interface UserProps{
    user:userModel
}
class User extends React.Component<UserProps,void>{
    render(){
        return(<div style={{width:'20px',height:'20px',float:'left'}}><image src={this.props.user.avatar}/><span>{this.props.user.nickName}</span>></div>);

    }
 }

export default User;