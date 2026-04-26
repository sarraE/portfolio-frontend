import { Project } from "./project"

export interface VisitorStat {

    id : number
    page : string
    counter : number
    lastVisit : string
    project? : Project
}
