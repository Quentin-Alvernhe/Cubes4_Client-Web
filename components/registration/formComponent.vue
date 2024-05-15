<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="newUser.firstname"
        :rules="[(v) => !!v || 'Le prénom est requis']"
        label="Prénom"
        required
      ></v-text-field>
      <v-text-field
        v-model="newUser.lastname"
        :rules="[(v) => !!v || 'Le nom est requis']"
        label="Nom"
        required
      ></v-text-field>
      <v-text-field
        v-model="newUser.login"
        :rules="[(v) => !!v || 'Le mail est requis']"
        label="email"
        required
        unique
      ></v-text-field>
      <v-text-field
        v-model="newUser.password"
        :rules="[(v) => !!v || 'Le mot de passe est requis']"
        label="Mot de passe"
        type="password"
        required
      ></v-text-field>
      <v-btn :disabled="!valid" @click="registerUser">Valider</v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";

const newUser = ref({
  firstname: "",
  lastname: "",
  login: "",
  password: "",
});

const { token } = storeToRefs(useAuthStore());
const valid = ref(false);

const registerUser = async () => {
  try {
    const response = await fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: newUser.value.firstname,
        lastname: newUser.value.lastname,
        login: newUser.value.login,
        password: newUser.value.password,
        role: { id: 3, name: "client" },
      }),
    });
    if (response.ok && response.status === 201) {
      alert("Inscription réussie");
      newUser.value = {
        firstname: "",
        lastname: "",
        login: "",
        password: "",
      };
    }
  } catch (error) {
    console.error("Erreur lors de l inscription:", error);
    alert("Une erreur est survenue lors de l inscription");
  }
};
</script>
