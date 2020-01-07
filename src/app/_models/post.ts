import { HelpMe } from '../_helper/help-me';

export class Post {
    id: number;
    farmerId: number;
    title: string;
    subtitle: string;
    description: string;
    img: string;
    thumb: string;

    constructor(id: string, title: string, subtitle: string, description: string, img: string, farmerId: string) {
        this.id = Number.parseInt(id);
        this.farmerId = Number.parseInt(farmerId);
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.img = HelpMe.getImg(img, farmerId);
        this.thumb = HelpMe.getThumb(img, farmerId);
    }
}
