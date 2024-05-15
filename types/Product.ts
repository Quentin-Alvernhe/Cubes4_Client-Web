import type { Family } from "./Family";

export type Product = {
    id: number;
    name: string;
    quantity: number;
    familyList: Family[];
    price: number;
    purchase_price: number;
    image: string;
    description: string;
    degustation: string;
};