import { Region } from "src/services/map.service";
import { Project } from "./Project";

export class MapObject {
    id: number;
    title: string;
    coordinates: Coordinates;
    // type: MapObjectType;
    projects?: Project[];
    // projectType?: ProjectType;
    region: Region;
}

// export type MapObjectType = 'capital' | 'city' | 'place' | 'project';

export interface Coordinates {
    x: number;
    y: number;
}