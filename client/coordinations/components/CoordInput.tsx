import * as React from 'react';
import {Doc,User,Lock} from '../model';
import UserCom from './User';
interface CoordInputProps{
    Doc:Doc,
    Users:User[],
    AddUser:(nickName:string)=>any,
    RemoveUser:(id:number)=>void,
    AddLock:(lock:Lock)=>any,
    RemoveLock:(id:number)=>void,
    UpdateDoc:(doc:Doc,text:string)=>any
}

class CoorInput extends React.Component<CoordInputProps,void>
{
    constructor(props,context)
    {
        super(props,context);
    }

    render(){
    return( <div><div>{this.props.Doc.text}</div>
        {this.props.Users.map((p,index)=><UserCom key={index} user={p}/>)}
    </div>)};
}

export default CoorInput;