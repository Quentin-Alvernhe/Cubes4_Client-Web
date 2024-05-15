<template>
    <div>
        <template class="flex text-6xl gap-6 items-center !w-full">
            <v-img src="../public/images/Baniere_vin.PNG" alt="Image de bouteilles" class="!w-full">
            </v-img>
        </template>
        <ProductsListComponent />
    </div>
</template>

<style scoped>
.custom-container {
    background-color: rgb(243, 233, 233);
    border-radius: 5px;
    box-shadow: 0px 0px 10px 0px #9b6a6a;
    color: #9b6a6a;
    margin-bottom: 20px;
}

.icon-custom {
    margin-left: 60px;
}
</style>

<script setup lang="ts">
definePageMeta({
    title: "Accueil",
    description: "Page d'accueil Produits",
});
</script>
  