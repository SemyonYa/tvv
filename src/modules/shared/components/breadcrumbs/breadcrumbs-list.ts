export class BreadcrumbsItem {
    constructor(
        public title: string,
        public route: string
    ) { }
}

export const breadcrumbs: { [key: string]: BreadcrumbsItem[] } = {
    '/catalog/industrial': [
        new BreadcrumbsItem('Индустриальные газы', '')
    ],
    '/catalog/special': [
        new BreadcrumbsItem('Специальные газы', '')
    ],
    '/catalog/equipment': [
        new BreadcrumbsItem('Газовое оборудование', '')
    ],
};