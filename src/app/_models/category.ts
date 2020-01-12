import { HelpMe } from '../_helper/help-me';
import { Good } from './good';

export class Category {
    id: number;
    name: string;
    img: string;

    goods: Good[];

    constructor(id: string, name: string, img: string) {
        this.id = Number.parseInt(id);
        this.name = name;
        this.img = HelpMe.getCategoryImg(img);
        this.goods = [];
    }

    fillGoods(goods: Good[]) {
        this.goods = goods;
    }
}
