export class Collection {
    name: string;
    id: string;
    count: number;
    order: number;
    show: boolean;
    children: Collection[];

    constructor() {
        this.name = '';
        this.id = '';
        this.count = 0;
        this.order = 0;
        this.show = true;
        this.children = [];
    }
}