export class OrderGood {
    id: number;
    price: number;
    quantity: number;
    quantityInCart: number;

    constructor(id: number, price: number, quantity: number, quantityInCart: number) {
        this.id = id;
        this.price = price;
        this.quantity = quantity;
        this.quantityInCart = quantityInCart;
    }
}
