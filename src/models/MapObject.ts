import { ProjectType } from "./Project";

export class MapObject {
    id: number;
    title: string;
    coordinates: Coordinates;
    type: MapObjectType;
    projectType?: ProjectType;
}

export type MapObjectType = 'capital' | 'city' | 'place' | 'project';

export interface Coordinates {
    x: number;
    y: number;
}