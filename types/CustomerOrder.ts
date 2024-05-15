import type { User } from "./User";
import type { CustomerOrderLine } from "./CustomerOrderLine";

export type CustomerOrder = {
    id: number,
    price: number;
    date: number;
    status: number;
    customer: User;
    CustomerOrderLine: CustomerOrderLine[];
};


