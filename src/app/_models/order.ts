import { OrderGood } from './order-good';
import { GoodInCart } from './good-in-cart';
import { Client } from './client';

export class Order {
    farmer: number;
    goods: OrderGood[];
    client: Client;

    constructor(farmerId: number, goodsInCart: GoodInCart[], client: Client) {
        this.farmer = farmerId;
        this.goods = goodsInCart.map(gic => new OrderGood(gic.id, gic.price, gic.quantity, gic.quantityInCart));
        this.client = client;
    }
}
