import { CtorItem } from "./Ctor";
import { Project } from './Project';

export class Place {
    id: number;
    name: string;
    thumbId?: number;
    isActive: boolean;
    region: string;
    x: number;
    y: number;

    items: CtorItem[];

    projects: Project[];


    constructor() {
        this.isActive = true;
        this.items = [];
        this.projects = [];
    }
}