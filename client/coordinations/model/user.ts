export type User={
    id:number;
    nickName:string;
    position:Position,
    avatar:string
};

export type Position={
    pointX:number;
    pointY:number;
    section:number;
    isLocked:boolean
}