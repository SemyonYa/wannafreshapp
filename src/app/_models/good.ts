import { HelpMe } from '../_helper/help-me';

export class Good {
    id: number;
    name: string;
    brief: string;
    description: string;
    farmerId: number;
    // farmerName: string;
    // categoryId: number;
    // categoryName: string;
    price: number;
    quantity: number;
    measure: string;
    img: string;
    thumb: string;

    private quantityInCart: number;

    constructor(id: string, name: string, brief: string, description: string, farmerId: string, price: string, quantity: string, measure: string, img: string) {
        this.id = Number.parseInt(id);
        this.name = name;
        this.brief = brief;
        this.description = description;
        this.farmerId = Number.parseInt(farmerId);
        // this.farmerName = farmerName;
        // this.categoryId = Number.parseInt(categoryId);
        // this.categoryName = categoryName;
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
}
