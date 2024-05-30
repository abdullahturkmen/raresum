<template>
  <v-container>
    <v-layout>
      <the-header />
    </v-layout>
    <v-container>
      <v-row class="justify-center text-center">
        <v-col cols="12" md="9" sm="10">
          <div class="mb-6"></div>
          <h1 class="text-h3 text-md-h2 text-white font-weight-medium">
            One stop go-to-reference tool.
          </h1>
          <div class="mb-4"></div>
          <div class="text-white text-h6 px-8">
            Harness the power of AI and intelligence for rare disease
            diagnostics. Decision support in minutes, at one stop.
          </div>
          <div class="mb-6"></div>
        </v-col>
      </v-row>
      <v-row class="bg-white rounded-lg pa-4"> </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const variants = ["elevated", "flat", "tonal", "outlined"];
const color = ref("indigo");
</script>
