<template>
  <v-dialog v-model="cartStore.is_open" width="800">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center bg-brown">
        <div class="text-h5 text-medium-emphasis-white ps-2">Panier</div>

        <v-btn
          icon="mdi-close"
          variant="text"
          @click="cartStore.is_open = false"
        ></v-btn>
      </v-card-title>

      <v-card-text>
        <v-data-table :headers="headers" :items="cartStore.cart">
          <template #item="{ item }">
            <tr>
              <td>{{ item.product.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.price / 100 }}</td>
              <td>{{ (item.price * item.quantity) / 100 }}</td>
              <td><v-icon @click="removeFromCart(item)">mdi-delete</v-icon></td>
            </tr>
          </template>
          <template #bottom></template>
        </v-data-table>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn border color="error" @click="clearCart()">Vider le panier</v-btn>
        <v-btn
          border
          color="primary"
          @click="!isAuthenticated ? (isModalVisible = true) : goToCheckout()"
          >Passer la commande
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { CartProduct } from "~/types/CartProduct";

const cartStore = useCartStore();
const router = useRouter();
const { isAuthenticated, isModalVisible } = storeToRefs(useAuthStore());

const headers = [
  { title: "Nom", value: "name" },
  { title: "Quantité", value: "quantity" },
  { title: "Prix", value: "price" },
  { title: "Total", value: "total" },
  { title: "Actions", value: "actions" },
];

const removeFromCart = (item: CartProduct) => {
  cartStore.removeFromCart(item);
};

const clearCart = () => {
  cartStore.clearCart();
};

const goToCheckout = () => {
  cartStore.is_open = false;
  router.push({
    path: "/ordersteps",
    query: { products: JSON.stringify(cartStore.cart) },
  });
};
</script>
