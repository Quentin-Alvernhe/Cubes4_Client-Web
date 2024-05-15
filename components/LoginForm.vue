<template>
  <v-dialog v-model="isModalVisible" max-width="500">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center bg-brown">
        <div class="text-h5 text-medium-emphasis-white ps-2">Connexion</div>

        <v-btn
          icon="mdi-close"
          variant="text"
          @click="isModalVisible = false"
        ></v-btn>
      </v-card-title>
      <v-divider class="mb-4"></v-divider>

      <v-card-text>
        <v-text-field
          v-model="email"
          label="Email"
          density="compact"
          variant="outlined"
          prepend-inner-icon="mdi-email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          label="Mot de passe"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="text-none"
          variant="text"
          border
          @click="isModalVisible = false"
        >
          Fermer
        </v-btn>

        <v-btn
          class="text-none"
          variant="text"
          border
          :disabled="!password || !email"
          :loading="isLoading"
          @click="login()"
          >Enregistrer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
const visible = ref(false);
const isLoading = ref(false);
const password = ref("");
const email = ref("");

const authStore = useAuthStore();
const { isModalVisible } = storeToRefs(authStore);

const login = async () => {
  try {
    isLoading.value = true;
    await authStore.login({ login: email.value, password: password.value });
    isModalVisible.value = false;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
