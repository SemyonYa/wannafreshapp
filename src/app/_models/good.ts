import { HelpMe } from '../_helper/help-me';

export class Good {
    id: number;
    name: string;
    brief: string;
    description: string;
    farmerId: number;
    categoryId: number;
    price: number;
    quantity: number;
    measure: string;
    img: string;
    thumb: string;

    quantityInCart: number;

    constructor(id: string, name: string, brief: string, description: string, farmerId: string, categoryId: string, price: string, quantity: string, measure: string, img: string) {
        this.id = Number.parseInt(id);
        this.name = name;
        this.brief = brief;
        this.description = description;
        this.farmerId = Number.parseInt(farmerId);
        this.categoryId = Number.parseInt(categoryId);
        this.price = Number.parseInt(price);
        this.quantity = Number.parseInt(quantity);
        this.measure = measure;
        this.img = HelpMe.getImg(img, farmerId);
        this.thumb = HelpMe.getThumb(img, farmerId);
        this.quantityInCart = 0;
    }

    setQuantityInCart(q: number) {
        this.quantityInCart = q;
    }

    quantityInCartIncr() {
        this.quantityInCart = (this.quantityInCart > 100) ? 100 : this.quantityInCart + 1;
    }
    
    quantityInCartDecr() {
        this.quantityInCart = (this.quantityInCart <= 0) ? 0 : this.quantityInCart - 1;
    }
}
