import * as React from 'react';
import {User,Doc,Lock,IState} from '../model';
import {connect,Dispatch} from 'react-redux';
import CoordInput from './CoordInput';
import UserList from './UserList';


import * as actionTypes from  '../constants/ActionTypes';
import {freezeDoc,
    sendMessage, addUser, removeUser, addLock, removeLock, updateDoc, socketForUpdateDoc
} from '../actions';


interface CoordinationProps{
    fetchUsers:()=>User[];
    Users:User[],
    Doc:Doc,
    dispatch:Dispatch<any>
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
        console.log("render coor");
        const {Doc,Users,dispatch}=this.props;

        return(
            <div>
                <CoordInput Doc={Doc} Users={Users} AddUser={(nickName:string)=>dispatch(addUser(nickName))}
                            RemoveUser={(id:string)=>dispatch(removeUser(id))}
                            AddLock={(t:Lock)=>dispatch(addLock(t))}
                            RemoveLock={(id:string)=>dispatch(removeLock(id))}
                            UpdateDoc={(text:any)=>{ dispatch(updateDoc(text));
                            dispatch(socketForUpdateDoc(text))}}   />
               <UserList Users={Users}/>
            </div>
        );
    }
}


const mapStateToProps=state=>({
    Doc:state.Doc,
    Users:state.Users
});


export default connect(mapStateToProps)(Coordination);