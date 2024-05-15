import type { CustomerOrder } from "./CustomerOrder";
import type { Product } from "./Product";

export type CartProduct = {
    quantity: number,
    price: number;
    product: Product;
    customerorder: CustomerOrder,
};