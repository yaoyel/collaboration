import * as React from 'react';
import {Doc,User,Lock} from '../model';
import UserCom from './User';
import util from '../../util/utils';
import {freezeDoc, meta} from "../actions";

interface CoordInputProps{
    Doc:Doc,
    Users:User[],
    AddUser:(nickName:string)=>any,
    RemoveUser:(id:string)=>void,
    AddLock:(lock:Lock)=>any,
    RemoveLock:(id:string)=>void,
    UpdateDoc:(text:any)=>any,
    FreezeDOc:()=>any
}

class CoorInput extends React.Component<CoordInputProps,void>
{
    constructor(props,context)
    {
        super(props,context);
    }


/*   componentDidMount(){
  const {UpdateDoc}=this.props;
        var coorInput= reactDom.findDOMNode(this.refs.coorInput);
        coorInput.addEventListener("DOMCharacterDataModified",(evt:MutationEvent)=>{if(evt.newValue.trim()!=evt.prevValue.trim())UpdateDoc({allText:coorInput.innerHTML,})},false);

    }*/
    handleUpdateDoc(e)
    {
        const sel=window.getSelection();
        const coorInput=document.getElementById("coorInput");
        let depth=1;
       if(coorInput.innerText)  depth=new util().getChildOffset(sel);
        this.props.UpdateDoc({allText:coorInput.innerText, depth:depth, midifiedText:sel.anchorNode.textContent,startOffset:sel.baseOffset,endOffset:sel.focusOffset});
        this.props.FreezeDOc();

    }

    render(){
        return( <div><div id="sib"></div><div style={{border:'5px solid green',width:'1000px',height:'200px'}}  id="coorInput" ref="coorInput"  onInput={this.handleUpdateDoc.bind(this)} contentEditable={true} suppressContentEditableWarning={true}> {this.props.Doc.allText}</div>
        {
           // this.props.Users.map((value,index)=><UserCom key={index} user={value}/>)
        }
    </div>)
    };

}

export default CoorInput;