import * as React from 'react';
import {User,Doc,Lock,IState} from '../model';
import { Dispatch } from 'redux';
import {connect} from 'react-redux';
import CoordInput from './CoordInput';
import UserList from './UserList';
import {
    addUser,
    removeUser,
    addLock,
    removeLock,
    updateDoc
} from '../actions';


interface CoordinationProps{
    Users:User[];
    Doc:Doc,
    dispatch:Dispatch<{}>
}

interface CoordinationState{
    text:string;
    disable:boolean
}

class Coordination extends React.Component<CoordinationProps,void>
{
    constructor(props,context)
    {
        super(props,context);
    }
    render(){
        const {Doc,Users,dispatch}=this.props;

        return(
            <div>
               <CoordInput Doc={Doc} Users={Users} AddUser={(nickName:string)=>dispatch(addUser(nickName))}
                RemoveUser={(id:number)=>dispatch(removeUser(id))}
                AddLock={(t:Lock)=>dispatch(addLock(t))}
                RemoveLock={(id:number)=>dispatch(removeLock(id))}
                UpdateDoc={(d:Doc,text:string)=>dispatch(updateDoc(d,text))}/>
                <UserList Users={Users}/>
         </div>
        );
    }
}


const mapStateToProps=state=>({
    Users:state.Users,
    Doc:state.Doc
});

export default connect(mapStateToProps)(Coordination);