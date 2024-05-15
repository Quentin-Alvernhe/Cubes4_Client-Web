<template>
    <v-container scrollable fluid v-if="!isLoading && productDetail" min-width="80w" max-width="90vw" max-height="90vh"
        class="d-flex justify-center align-center">
        <v-sheet class="rounded-xl pa-4">
            <v-row no-gutters>
                <v-col class="d-flex justify-center m-auto">
                    <v-sheet class="d-flex justify-center font-weight-bold ">
                        {{ productDetail.name.toUpperCase() }}
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="4" class="d-flex justify-center flex-column align-self-center">
                    <v-sheet class="d-flex justify-around rounded-lg">
                        <v-img :src="productDetail.image" alt="Product Image" :height="360"></v-img>
                    </v-sheet>
                </v-col>
                <v-col>
                    <v-sheet class="d-flex justify-start text-body-1 mt-8 mb-8">
                        {{ productDetail.description }}<br>
                    </v-sheet>
                    <v-sheet class="d-flex justify-start text-body-1 mt-8 mb-8">
                        Dégustation: {{ productDetail.degustation }}<br>
                    </v-sheet>

                    <v-sheet class="d-flex justify-end mb-8">
                        Prix:<br>
                         {{ (productDetail.price / 100).toFixed(2) }} € / bouteille<br>
                        {{ ((productDetail.price *6) / 100).toFixed(2) }} € / carton
                    </v-sheet>

                </v-col>

            </v-row>
        </v-sheet>
    </v-container>
</template>

<script setup lang="ts">

import type { Product } from "~/types/Product";

const isLoading = ref(false);
const productDetail = ref<Product>();
const productStore = useProductStore();
const cartStore = useCartStore();

onMounted(async () => {
    try {
        isLoading.value = true;
        await productStore.fetchOneProduct();
        await productStore.fetchOneProduct();
        productDetail.value = productStore.infoProduct;
    } catch (error) {
        console.log("error", error);
    } finally {
        isLoading.value = false;
    }
});

const addBoxToCart = (product: Product) => {
    cartStore.addBoxToCart(product);
};

const addBottleToCart = (product: Product) => {
    cartStore.addBottleToCart(product);
};

</script>
