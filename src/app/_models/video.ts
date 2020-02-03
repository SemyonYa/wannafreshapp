export class Video {
    id: number;
    farmerId: number;
    title: string;
    description: string;
    url: string;

    constructor(id: string, title: string, description: string, url: string, farmerId: string) {
        this.id = Number.parseInt(id);
        this.farmerId = Number.parseInt(farmerId);
        this.title = title;
        this.description = description;
        this.url = url;
    }
}
