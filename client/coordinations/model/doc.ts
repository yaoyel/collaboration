import {Position}from './user';
export type Doc= {
    router:string;
    text:string,
    isLock:boolean,
    displayAreas:[number,number]
};

export type Lock={
    id:number,
    lockedBy:string;
    lockedAt:Date;
    collaborators:string[];
    position:Position;
}