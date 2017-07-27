import {Position}from './user';
export type Doc= {
    router:string;
    allText:string;
    midifiedText:string;
    depth:number;
    isLock:boolean;
    displayAreas:[number,number],
    updateFromSocket:boolean,
    startOffset:number,
    endOffset:number
};

export type Lock={
    id:string,
    lockedBy:string;
    lockedAt:Date;
    collaborators:string[];
    position:Position;
}