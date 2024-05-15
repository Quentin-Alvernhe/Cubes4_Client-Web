import { defineStore } from "pinia";
import type { Product } from "~/types/Product";
import type { User } from "~/types/User";
import type { CustomerOrder } from "~/types/CustomerOrder";

export type OrderState = {
  orders: CustomerOrder[];
  createModalVisible: boolean;
  customers: User[];
  products: Product[];
  filteredOrders: CustomerOrder[];
};

export const useCustomerOrderStore = defineStore("customerOrder", {
  state: (): OrderState => ({
    orders: [],
    createModalVisible: false,
    customers: [],
    products: [],
    filteredOrders: [],
  }),

  actions: {
    async fetchCustomerOrder(): Promise<void> {
      const { user } = storeToRefs(useAuthStore());

      this.orders = await $fetch<CustomerOrder[]>(
        "http://localhost:8080/customer-orders",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Copy datas
      this.filteredOrders = this.orders.filter((order) => {
        return order.customer.id === user?.value?.id;
      });
    },

    async fetchCustomers(): Promise<void> {
      const { token } = storeToRefs(useAuthStore());

      this.customers = await $fetch<User[]>("http://localhost:8080/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token?.value,
        },
      });
    },

    filterOrders({
      search,
      status,
    }: {
      search: string;
      status: number[];
    }): void {
      console.log(search);
      if (search) {
        this.filteredOrders = this.orders.filter(
          (order) =>
            order.customer.firstname
              ?.toLowerCase()
              ?.includes(search.toLowerCase()) ||
            order.customer.lastname
              ?.toLowerCase()
              ?.includes(search.toLowerCase()) ||
            order.lines.find((l) =>
              l.product.name?.toLowerCase()?.includes(search.toLowerCase())
            )
        );
      } else this.filteredOrders = [...this.orders];

      if (status.length) {
        this.filteredOrders = this.filteredOrders.filter((order) =>
          status.includes(order.status)
        );
      } else if (!search) this.filteredOrders = [...this.orders];
    },
  },
});
