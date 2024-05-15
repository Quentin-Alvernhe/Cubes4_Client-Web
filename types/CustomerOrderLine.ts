import type { Product } from "./Product";

export type CustomerOrderLine = {
  idCustomerOrderLine: number;
  quantity: number;
  product: Product;
  price: number;
};
