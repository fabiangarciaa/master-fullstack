export class Post {
    constructor(
        public id: number,
        // tslint:disable-next-line: variable-name
        public user_id: number,
        // tslint:disable-next-line: variable-name
        public category_id: number,
        public title: string,
        public content: string,
        public image: string,
        public createdAt: any
    ) {}
}
