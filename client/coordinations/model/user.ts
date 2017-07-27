export type User= {
    id:string, nickName: string,isActive:boolean, position: Position, avatar: string
}

export type Position= {
    pointX: number,pointY: number,section: number, isLocked: boolean
}