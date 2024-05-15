<template>
  <div class="mb-12">
  <v-app-bar app color="brown" dark>
    <v-btn to="/Homepage">NEGOSUD</v-btn>
    <v-btn v-if="!isAuthenticated" to="/Register">Inscription</v-btn>

    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon @click="openCart()">
      <v-icon>mdi-basket</v-icon>
      <v-badge color="red" :content="cartStore.cartCount"></v-badge>
    </v-btn>
    <v-btn v-if="!isAuthenticated" icon @click="isModalVisible = true">
      <v-icon>mdi-account</v-icon>
      <v-tooltip activator="parent" location="bottom">Se connecter</v-tooltip>
    </v-btn>
    <CartComponent />
    <v-app-bar-nav-icon
    v-if="isAuthenticated"
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
  </v-app-bar>

  <!--<v-navigation-drawer expand-on-hover rail app color="blue" dark>-->
  <v-navigation-drawer
  
    v-model="drawer"
    color="brown"
    location="right"
    temporary
  >
    <v-list>
      <v-list-item
        v-if="isAuthenticated"
        :title="user?.firstname"
        :subtitle="user?.sub"
      ></v-list-item>

      <!-- Mettre info utilisateur ici-->
      <v-divider></v-divider>
      <v-list-item
        prepend-icon="mdi-basket"
        title="Commandes"
        to="orderHistory"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-cancel"
        title="Déconnexion"
        value="myfiles"
        @click="logout()"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</div>
</template>

<script setup lang="ts">
const router = useRouter();
const authStore = useAuthStore();
const { isAuthenticated, isModalVisible, user } = storeToRefs(authStore);

const drawer = ref(false);

const cartStore = useCartStore();

const openCart = () => {
cartStore.openDialog();
};

const logout = () => {
authStore.disconnect();
drawer.value = false;
};

router.afterEach((to) => {
// On vérifie si l'utilisateur accède à la page des étapes de commande
if (to.path === "/orderHistory") {
  cartStore.closeDialog();
}
});
</script>
