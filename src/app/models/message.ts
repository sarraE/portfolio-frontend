import { Project } from "./project"


export interface Message {
    idMessage : number
    name : string
    email : string
    subject : string
    content : string
    dispatchDate : string
    read : boolean
    project? : Project
}
