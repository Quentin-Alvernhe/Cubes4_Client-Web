<template>
  <v-card>
    <!--<v-card-title>Historique Commandes</v-card-title>-->
    <v-card-text>
      <v-text-field
        v-model="search"
        label="Recherche"
        prepend-inner-icon="mdi-magnify"
        outlined
        hide-details
        single-line
      ></v-text-field>
    </v-card-text>

    <v-data-table :headers="headers" :items="filteredOrders" :search="search">
      <template #item.date="{ item }">
        {{ formatDate(item.date) }}
      </template>
      <template #item.status="{ item }">
        {{ getOrderStatus(item.status) }}
      </template>
      <template #item.customer="{ item }">
        {{ item.customer.firstname }} {{ item.customer.lastname }}
      </template>
      <template #item.product="{ item }">
        <span v-for="(line, index) in item.lines" :key="index">
          - <span class="font-bold">{{ line.product.name }}</span> | Qté :
          <span class="font-bold">{{ line.quantity }}</span>
          <br />
        </span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const headers = ref([
  { title: "ID Commande", value: "id", sortable: true },
  { title: "Date", value: "date", sortable: true },
  { title: "Statut", value: "status", sortable: true },
  { title: "Client", value: "customer", sortable: true },
  { title: "Produits", value: "product", sortable: true },
]);

const search = ref("");
const store = useCustomerOrderStore();

onMounted(async () => {
  await store.fetchCustomerOrder();
});

const filteredOrders = computed(() => {
  return store.filteredOrders;
});

const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR");
};

const getOrderStatus = (status: number) => {
  switch (status) {
    case 1:
      return "En préparation";
    case 2:
      return "Terminée";
    case 3:
      return "Livré";
    case 4:
      return "Enregistrée";
  }
};
</script>
