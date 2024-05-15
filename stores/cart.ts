import { defineStore } from 'pinia';
import type { CartProduct } from "../types/CartProduct";
import type { Product } from '~/types/Product';
import type { CustomerOrder } from '~/types/CustomerOrder';

interface CartState {
    cart: CartProduct[];
    is_open: boolean;
    cartCount: number;
}

export const useCartStore = defineStore({
    id: 'cart',
    state: (): CartState => ({
        cart: [],
        is_open: false,
        cartCount: 0,
    }),
    actions: {
        addBoxToCart(product: Product) {
            const { user } = storeToRefs(useAuthStore());
            let cartProduct = this.cart.find(item => item.product === product);
            if (cartProduct) {
                cartProduct.quantity += 6;
            } else {
                const newCartProduct = {
                    quantity: 6,
                    price: product.price * 6,
                    product,
                    customerorder: {
                        id: user?.value?.id as number
                    }
                } as CartProduct;
                this.cart.push(newCartProduct);
            }
            this.cartCount += 1;
        },

        addBottleToCart(product: Product) {
            const { user } = storeToRefs(useAuthStore());
            let cartProduct = this.cart.find(item => item.product === product);
            if (cartProduct) {
                cartProduct.quantity += 1;
            } else {
                const newCartProduct = {
                    quantity: 1,
                    price: product.price,
                    product,
                    customerorder: {
                        id: user?.value?.id as number
                    }
                } as CartProduct;
                this.cart.push(newCartProduct);
            }
            this.cartCount += 1;
        },

        
        removeFromCart(product: CartProduct) {
            this.cart = this.cart.filter((item: CartProduct) => item !== product);
            this.cartCount -= product.quantity;
        },

        getTotal() {
            return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        },

        clearCart() {
            this.cart = [];
            this.cartCount = 0;
        },

        openDialog() {
            this.is_open = true;
        },

        closeDialog() {
            this.is_open = false;
        },
    },
    persist: {
        storage: persistedState.localStorage,
    }
});

export function useCart() {
    return useCartStore();
}