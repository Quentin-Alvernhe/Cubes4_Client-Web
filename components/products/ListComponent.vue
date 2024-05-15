<template>
  <v-container class="custom-container">
    <v-btn @click="toggleSort" class="mb-4"
      >Trier par {{ sortCriterion === "name" ? "Famille" : "Nom" }}</v-btn
    >
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="4"
        v-for="(product, index) in sortedProducts"
        :key="index"
      >
        <v-row align="center">
          <v-col class="mx-9">
            <v-divider color="black"></v-divider>
          </v-col>
          <v-col>
            <v-icon size="32px"> mdi-bottle-wine </v-icon>
          </v-col>
          <v-col class="mx-8 text-center">
            <v-divider color="black"></v-divider>
          </v-col>
        </v-row>
        <v-card class="custom-card ma-2 pa-2" elevation="8">
          <v-img
            height="300"
            :src="product.image"
            alt="Product Image"
            class="ma-2 pa-2"
          ></v-img>
          <v-toolbar class="custom-toolbar" elevation="4">
            <span class="product-title">{{ product.name }}</span>
          </v-toolbar>
          <v-sheet class="ma-2 pa-2">
            <div
              class="family"
              v-for="(family, familyIndex) in product.familyList"
              :key="familyIndex"
            >
              {{ family.name }}
            </div>
            <v-btn class="ma-2" rounded @click="addBottleToCart(product)">
              <span class="button-text">Ajouter une bouteille</span>
            </v-btn>
            <v-btn class="ma-2" rounded @click="addBoxToCart(product)">
              <span class="button-text">Ajouter un carton</span>
            </v-btn>

            <v-btn
              class="ma-2"
              rounded
              @click="(ProductDetailIsOpen = true), (idProduct = product.id)"
            >
              <span class="button-text">Détails</span>
            </v-btn>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="ProductDetailIsOpen" scrollable>
      <productsModalProductDetail />
    </v-dialog>
  </v-container>
</template>

<style scoped>
.custom-container {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 7px 10px 8px #915d5d;
}

.custom-card {
  border-radius: 15px;
}

.custom-toolbar {
  background-color: #795548;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
}

.family {
  font-size: 10px;
  font-family: Arial, Helvetica, sans-serif;
}

.button-text {
  font-size: 11px;
}

.product-title {
  margin-left: 5px;
}

.family {
  font-size: 10px;
  font-family: Arial, Helvetica, sans-serif;
}

.button-text {
  font-size: 11px;
}

.product-title {
  margin-left: 5px;
}
</style>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { Product } from "../../types/Product";
import type { Family } from "../../types/Family";

const products = ref<Product[]>([]);

const sortCriterion = ref("name"); // Critère de tri initial par défaut

const sortedProducts = computed(() => {
  return products.value.slice().sort((a, b) => {
    if (sortCriterion.value === "name") {
      return a.name.localeCompare(b.name);
    } else if (
      sortCriterion.value === "family" &&
      a.familyList[0] &&
      b.familyList[0]
    ) {
      return a.familyList[0].name.localeCompare(b.familyList[0].name);
    }
    return 0;
  });
});

const productStore = useProductStore();
const familyStore = useFamilyStore();
const cartStore = useCartStore();
const families = ref<Family[]>([]);
const isLoading = ref(false);
const ProductDetailIsOpen = ref(false);
const { idProduct } = storeToRefs(useProductStore());

const addBoxToCart = (product: Product) => {
  cartStore.addBoxToCart(product);
};

const addBottleToCart = (product: Product) => {
  cartStore.addBottleToCart(product);
};

const toggleSort = () => {
  sortCriterion.value = sortCriterion.value === "name" ? "family" : "name";
};

onMounted(async () => {
  isLoading.value = true;

  // Liste produits
  await productStore.fetchProducts();
  products.value = productStore.products;

  // Liste familles
  await familyStore.fetchFamilies();
  families.value = familyStore.families;
});
</script>
