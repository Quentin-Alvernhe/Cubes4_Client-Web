import { defineStore } from "pinia";
import type { CustomerOrder } from "../types/CustomerOrder";

export type CustomerOrderState = {
    idCustomer?: number;
    infoCustomer?: CustomerOrder;
    customers: CustomerOrder[];
    isLoading: Boolean;
};

export const useCustomerStore = defineStore("customer", {
    state: (): CustomerOrderState => ({
        idCustomer: undefined,
        infoCustomer: undefined,
        customers: [],
        isLoading: false,
    }),

    actions: {
        async fetchOneCustomer(): Promise<CustomerOrder | undefined> {
            try {
                this.infoCustomer = await $fetch<CustomerOrder>(
                    `http://localhost:8080/customer-order/${this.idCustomer}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );
                return this.infoCustomer; // Retourner le produit récupéré
            } catch (error) {
                console.error('Erreur lors de la récupération du produit', error);
            }
        },

        async fetchCustomer() {
            try {
                this.isLoading = true;

                this.customers = await $fetch<CustomerOrder[]>('http://localhost:8080/customer-orders', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                this.isLoading = false;
            } catch (error) {
                console.error('Error fetching products:', error);
                this.isLoading = false;
            }
        },
    }
});


export function useCustomeOrder() {
    return useCustomerStore();
}