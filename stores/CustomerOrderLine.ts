import { defineStore } from "pinia";
import type { Product } from "~/types/Product";
import type { User } from "~/types/User";
import type { CustomerOrderLine } from "~/types/CustomerOrderLine";

export type OrderState = {
  orders: CustomerOrderLine[];
  createModalVisible: boolean;
  customers: User[];
  products: Product[];
  filteredOrdersDetail: CustomerOrderLine[];
};

export const useCustomerOrderLineStore = defineStore("customerOrderLine", {
  state: (): OrderState => ({
    orders: [],
    createModalVisible: false,
    customers: [],
    products: [],
    filteredOrdersDetail: [],
  }),

  actions: {
    async fetchCustomerOrderLine(id: number): Promise<void> {
      const { token } = storeToRefs(useAuthStore());

      this.orders = await $fetch<CustomerOrderLine[]>(
        `http://localhost:8080/customer-order-line/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            //Authorization: "Bearer " + token?.value,
          },
        }
      );
      // Copy datas
      this.filteredOrdersDetail = [...this.orders];
    },
  },
});
