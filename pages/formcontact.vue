<template>
    <v-container>
        <v-card class="mx-auto" max-width="400" v-if="!formSubmitted">
            <v-card-title class="text-center">
                Formulaire de contact
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="submitForm">
                    <v-col cols="12">
                        <v-text-field v-model="firstName" label="Prénom" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="lastName" label="Nom" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="email" label="Email" required type="email"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea v-model="message" label="Message" required></v-textarea>
                    </v-col>
                    <v-btn type="submit" class="text-center">Envoyer</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
        <v-row v-else>
            <v-col cols="12">
                <p class="text-center">Nous vous remercions pour votre message, nous vous répondrons dans les meilleurs
                    délais.</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const formSubmitted = ref(false);

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const message = ref('');

const submitForm = () => {
    // Vérification de la validité du formulaire
    if (!firstName.value || !lastName.value || !email.value || !message.value) {
        alert('Veuillez remplir tous les champs du formulaire.');
        return;
    }

    if (!isValidEmail(email.value)) {
        alert('Veuillez saisir une adresse email valide.');
        return;
    }

    console.log({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        message: message.value
    });

    formSubmitted.value = true;

    resetForm();
};

const resetForm = () => {
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    message.value = '';
};


const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
</script>

<style scoped></style>