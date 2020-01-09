import { HelpMe } from '../_helper/help-me';
import { Good } from './good';
import { Promo } from './promo';
import { Post } from './post';
import { Video } from './video';

export class Farmer {
    id: number;
    name: string;
    description: string;
    email: string;
    minCost: number;
    delivery: string;
    img: string;
    thumb: string;

    private goods: Good[];
    private promos: Promo[];
    private posts: Post[];
    private videos: Video[];

    constructor(id: string, name: string, description: string, email: string, minCost: string, delivery: string, img: string) {
        this.id = Number.parseInt(id);
        this.name = name;
        this.description = description;
        this.email = email;
        this.minCost = Number.parseInt(minCost);
        this.delivery = delivery;
        this.img = HelpMe.getImg(img, id);
        this.thumb = HelpMe.getThumb(img, id);
        this.goods = [];
        this.promos = [];
        this.posts = [];
        this.videos = [];
    }

    fillGoods(items: Good[]) {
        this.goods = items;
    }

    fillPromos(items: Promo[]) {
        this.promos = items;
    }

    fillPosts(items: Post[]) {
        this.posts = items;
    }

    fillVideos(items: Video[]) {
        this.videos = items;
    }
}
