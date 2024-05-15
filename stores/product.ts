import { defineStore } from "pinia";
import type { Product } from "../types/Product";

export type ProductState = {
  idProduct?: number;
  infoProduct?: Product;
  products: Product[];
  isLoading: Boolean;
};

export const useProductStore = defineStore("product", {
  state: (): ProductState => ({
    idProduct: undefined,
    infoProduct: undefined,
    products: [],
    isLoading: false,
  }),

  actions: {
    async fetchOneProduct(): Promise<Product | undefined> {
      try {
        this.infoProduct = await $fetch<Product>(
          `http://localhost:8080/product/${this.idProduct}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        return this.infoProduct; // Retourner le produit récupéré
      } catch (error) {
        console.error('Erreur lors de la récupération du produit', error);
      }
    },

    async fetchProducts() {
      try {
        this.isLoading = true;

        this.products = await $fetch<Product[]>('http://localhost:8080/products', {
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
