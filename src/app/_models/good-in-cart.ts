import { Good } from './good';

export class GoodInCart {

    id: number;
    name: string;
    farmerId: number;
    categoryId: number;
    price: number;
    quantity: number;
    measure: string;
    thumb: string;

    quantityInCart: number;

    constructor(good: Good) {
        this.id = good.id;
        this.name = good.name;
        this.farmerId = good.farmerId;
        this.categoryId = good.categoryId;
        this.price = good.price;
        this.quantity = good.quantity;
        this.measure = good.measure;
        this.thumb = good.img;
        this.quantityInCart = good.quantityInCart;
    }
    quantityInCartIncr() {
        this.quantityInCart = (this.quantityInCart > 100) ? 100 : this.quantityInCart + 1;
    }

    quantityInCartDecr() {
        this.quantityInCart = (this.quantityInCart <= 0) ? 0 : this.quantityInCart - 1;
    }

    // sum(): number {
    //     return this.quantityInCart * this.price;
    // }
}

