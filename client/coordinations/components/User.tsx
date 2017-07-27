import * as React from 'react';
import {User as userModel} from '../model/user';

interface UserProps{
    user:userModel
}
class User extends React.Component<UserProps,void>{
    constructor(props,ctx)
    {
        super(props,ctx);
    }
    render(){
        return(<div style={{width:'auto',height:'20px',float:'left',color:'red'}}><image src={this.props.user.avatar}/><span>{this.props.user.nickName}//</span></div>);
    }
 }

export default User;