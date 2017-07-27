/**
 * Created by YBC on 2017/7/24.
 */
export  default class utils
{
    getChildOffset(sel:Selection):number
    {
        let indep=1;
        let parentNode:any=sel.anchorNode.parentNode;
        var anchorNode:any=sel.anchorNode;
        while((anchorNode.nodeName=="DIV" || (sel.anchorNode.nodeName!="DIV" && parentNode.id!="coorInput")) &&　parentNode.previousSibling && parentNode.nodeName!='#comment')
        {
            indep++;
            if(sel.anchorNode.nodeName=="DIV")
                anchorNode=anchorNode.previousSibling;
            else
                parentNode=parentNode.previousSibling;
        }

        return indep;
    }

    mergeContent(depth:number,content:string,dispatch,startOffset:number,endOffset:number,editer:string):boolean
    {
        const conflict= this.conflict(depth,startOffset,endOffset);
        if(conflict) return conflict;
        const node= document.getElementById ("coorInput");
        const range=document.createRange()
        node.appendChild(document.createElement("DIV"));
        range.selectNodeContents(node);
        range.setStart(node,depth-1);
        range.setEnd(node,depth);
        var newElement = range.createContextualFragment(`<div>${content.length==0?'<br/>':content}</div>`)
        range.extractContents ();
        range.insertNode(newElement);

        return false;
    }

    conflict(depth:number,startOffset:number,endOffset:number):boolean
    {
        var sel=window.getSelection();

        if(!sel.anchorNode || !sel.anchorNode.parentNode) return false;

        var seldepth=this.getChildOffset(sel);
        var selStartOffset=sel.baseOffset;
        var selEndOffset=sel.focusOffset;
        return (depth===seldepth)
        //todo startoffset and end offset
    }

    unLockParagraph()
    {
        const node= document.getElementById ("coorInput");
        var childrens=node.children;
        for (var i = 0; i < childrens.length; i++) {
            if((<HTMLElement>childrens[i]).accessKey=="12323")
            {
                (<HTMLElement>childrens[i]).style.backgroundColor="white";
                (<HTMLElement>childrens[i]).contentEditable="true";
            }

        }

    }
    lockParagraph(sel:Selection,depth:number)
    {
        if(!sel)
            sel=window.getSelection();
        if(!sel.anchorNode || !sel.anchorNode.parentNode) return;
        if(!depth)
            depth=this.getChildOffset(sel);
        if(!sel.anchorNode || !sel.anchorNode.parentNode) return;
        const node= document.getElementById ("coorInput");

        if(sel.anchorNode.parentElement.id!="coorInput"){
            sel.anchorNode.parentElement.style.backgroundColor="red";
            sel.anchorNode.parentElement.contentEditable="false";
            sel.anchorNode.parentElement.accessKey="12323"
        }   /*    var range=sel.getRangeAt(0).cloneRange();var newNode = document.createElement("div");
        range.setEnd(node,depth);
        range.setStart(node,depth-1);
        newNode.style.backgroundColor= "yellow";
        newNode.contentEditable= "false";
        range.surroundContents(newNode);
        sel.setPosition(node,depth+2);*/
    }
/*
    pasteHtmlAtCaret(html) {
        var sel, range;
        var mySpan = document.getElementById ("coorInput");
        range = document.createRange();
        range.selectNodeContents(mySpan)
        range.setStart(mySpan,1);
        range.setEnd(mySpan,1);
        range.deleteContents();
        var el = document.createElement("div");
        el.innerHTML = html;
        var frag = document.createDocumentFragment(), node, lastNode;
        while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);
        if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
        }
        console.log(range)

    }*/
}