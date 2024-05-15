<template>
  <div>
    <span class="flex text-6xl gap-6 mt-5 ml-5 items-center">
      <v-toolbar density="comfortable" class="custom-container bg-brown">
        <v-icon class="icon-custom">mdi-account</v-icon>
        <v-toolbar-title class="ma-6">Inscription</v-toolbar-title>
      </v-toolbar>
    </span>
    <RegistrationFormComponent class="test" />
  </div>
</template>

<style scoped>
.custom-container {
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px #9b6a6a;
  color: #9b6a6a;
  margin-bottom: 20px;
}

.icon-custom {
  margin-left: 60px;
}

.test {
  margin-bottom: 230px;
}
</style>
