export class NewsModel {
    constructor(
    public id?: string,

    public title?: string,

    public content?: string,

    public isDeleted?: boolean,

    public userId?: string,

    public createdAt?: Date,

    public updatedAt?: Date)
    {}
}