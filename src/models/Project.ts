import { CtorItem } from "./Ctor";

export class Project {
    id: number;
    name: string;
    period: string;
    /** В млн. руб. */
    costs: number;
    people: string;
    type: ProjectType;
    thumbId: number;
    placeId: number;
    isActive: boolean;

    items: CtorItem[];

    constructor() {
        this.isActive = true;
        this.items = [];
    }
}

export type ProjectType = 'Школа' | 'Дом культуры' | 'Детский сад' | 'Больница' | 'Коммуникации';