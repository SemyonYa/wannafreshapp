import { HelpMe } from '../_helper/help-me';

export class Category {
    id: number;
    name: string;
    img: string;

    constructor(id: string, name: string, img: string) {
        this.id = Number.parseInt(id);
        this.name = name;
        this.img = HelpMe.getCategoryImg(img);
    }
}
