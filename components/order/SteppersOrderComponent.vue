<template>
  <v-stepper
    v-if="!showOrderSummary"
    v-model="step"
    :items="items"
    show-actions
  >
    <template v-slot:item.1>
      <h3 class="text-h6">Expédition</h3>
      <br />
      <v-radio-group v-model="shipping" label="Mode de Livraison">
        <v-radio label="Expédition Standard" value="5"></v-radio>
        <v-radio label="Expédition Prioritaire" value="10"></v-radio>
        <v-radio label="Expédition Express" value="15"></v-radio>
      </v-radio-group>
    </template>

    <template v-slot:item.2>
      <!-- Paiement -->
      <h3 class="text-h6">Paiement</h3>
      <br />
      <v-sheet border>
        <v-row no-gutters>
          <v-col v-for="(image, index) in images" :key="index" cols="12" sm="4">
            <v-sheet class="ma-2 pa-2">
              <v-img
                height="80"
                :src="image"
                contain
                @click="selectPaymentMethod(index)"
                style="cursor: pointer"
              ></v-img>
            </v-sheet>
          </v-col>
        </v-row>
      </v-sheet>
      <v-dialog v-model="showPaymentDialog" max-width="500">
        <v-card>
          <v-card-title> Paiement par Carte Bancaire </v-card-title>
          <v-card-subtitle> Montant à payer: {{ total }} </v-card-subtitle>
          <v-card-text>
            <!-- Contenu de confirmation de paiement -->
            <p>Veuillez saisir les détails de votre carte de crédit</p>
            <v-text-field
              v-model="creditCardNumber"
              label="Numéro de carte"
              required
            ></v-text-field>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="expiryDate"
                  label="Date d'expiration"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="cvv" label="CVV" required></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn color="blue darken-1" @click="processPayment">Payer</v-btn>
              <v-btn color="blue darken-1" @click="cancelPayment"
                >Annuler</v-btn
              >
            </v-card-actions>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-stepper>

  <template v-if="showOrderSummary">
    <h3 class="text-h6">Récapitulatif de la commande</h3>
    <br />
    <v-sheet border>
      <v-table>
        <thead>
          <tr>
            <th>Description</th>
            <th class="text-end">Quantité</th>
            <th class="text-end">Prix</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in productsFromCart" :key="index">
            <td>{{ product.product.name }}</td>
            <td class="text-end">{{ product.quantity }}</td>
            <td class="text-end">
              {{ (product.quantity * product.price) / 100 }}€
            </td>
          </tr>

          <tr>
            <td>Frais de livraison</td>
            <td></td>
            <td class="text-end">{{ shipping }}€</td>
          </tr>
          <tr>
            <th>Total</th>
            <th></th>
            <th class="text-end">{{ total }}€</th>
          </tr>
        </tbody>
      </v-table>
    </v-sheet>
  </template>
</template>

<script setup lang="ts">
import type { CartProduct } from "~/types/CartProduct";
import type { CustomerOrder } from "~/types/CustomerOrder";

const showPaymentDialog = ref(false);
const showOrderSummary = ref(false);
const creditCardNumber = ref("");
const expiryDate = ref("");
const cvv = ref("");
const isLoading = ref(false);

const productsFromCart = ref<CartProduct[]>([]);
const customerStore = useCustomerStore();
const route = useRoute();
const shipping = ref(0);
const step = ref(1);
const items = ref([
  "Sélectionnez votre mode de Livraison",
  "Sélectionnez votre mode de paiement",
]);

const images = ref([
  "/ordersteps-images/paypal.png",
  "/ordersteps-images/mastercard.png",
  "/ordersteps-images/applepay.png",
]);

onMounted(() => {
  const productsParam = route.query.products;
  if (typeof productsParam === "string") {
    productsFromCart.value = JSON.parse(productsParam);
  }
});

const subtotal = computed(() => {
  return productsFromCart.value.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  );
});
const total = computed(() => {
  return subtotal.value / 100 + Number(shipping.value ?? 0);
});

const selectPaymentMethod = (index: number) => {
  switch (index) {
    case 0:
      openPayPalPayment();
      break;
    case 1:
      openCreditCardPayment();
      break;
    case 2:
      openApplePayPayment();
      break;
    default:
      break;
  }
};

const openPayPalPayment = () => {
  window.location.href = "https://www.paypal.com/signin";
};

const openCreditCardPayment = () => {
  showPaymentDialog.value = true;
};
const openApplePayPayment = () => {
  window.location.href = "https://www.apple.com/fr/apple-pay/";
};

const processPayment = () => {
  showPaymentDialog.value = false;
  alert("Paiement effectué avec succès!");
  saveOrder();
};

const cancelPayment = () => {
  showPaymentDialog.value = false;
};

const { user } = storeToRefs(useAuthStore());
const saveOrder = async () => {
  try {
    isLoading.value = true;

    const customerorder = await $fetch<CustomerOrder>(
      "http://localhost:8080/customer-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: new Date(),
          status: 4,
          total: total.value,
          customer: {
            id: user?.value?.id,
          },
        }),
      }
    );

    await Promise.all(
      productsFromCart.value.map(async (product) => {
        try {
          await $fetch(`http://localhost:8080/customer-order-line`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quantity: product.quantity,
              price: product.price,
              product: {
                id: product.product.id,
              },
              customerorder: {
                id: customerorder.id,
              },
            }),
          });
        } catch (error) {
          console.error(
            "Erreur lors de l'enregistrement de la ligne de commande :",
            error
          );
        }
      })
    );

    // Réinitialisation du panier après l'envoi des commandes
    useCartStore().clearCart();

    // Affichage du résumé de la commande
    showOrderSummary.value = true;
    step.value++;
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la commande :", error);
  } finally {
    isLoading.value = false;
  }
};
</script>
