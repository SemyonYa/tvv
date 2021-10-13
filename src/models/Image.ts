import { environment } from '../environments/environment';

export class Image {
    constructor(
        public id: number,
        public name: string,
        public projectId: number = null,
        public period: ImagePeriod = null
    ) { }

    get thumb() {
        return `${environment.baseUrl}/${environment.imagesDir}/__${this.name}`;
    }

    get medium() {
        return `${environment.baseUrl}/${environment.imagesDir}/_${this.name}`;
    }

    get large() {
        return `${environment.baseUrl}/${environment.imagesDir}/${this.name}`;
    }
}

export type ImagePeriod = 'after' | 'before';