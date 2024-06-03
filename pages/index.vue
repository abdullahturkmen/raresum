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
      <v-row class="bg-white rounded-lg elevation-8">
        <v-col
          @click="setTab(1)"
          :class="` text-center text-indigo-darken-4 cursor-pointer ${
            activeTab == 1 && 'border-b-lg'
          } `"
          style="border-color: #0070fa !important"
        >
          <h3>Quick Add</h3>
          <span class="opacity-60">find & add symptoms from menu</span>
        </v-col>
        <v-col
          @click="setTab(2)"
          :class="` text-center text-indigo-darken-4 cursor-pointer ${
            activeTab == 2 && 'border-b-lg'
          } `"
          style="border-color: #0070fa !important"
        >
          <h3>Free Text</h3>
          <span class="opacity-60">type or copy & paste patient story</span>
        </v-col>
        <v-col
          @click="setTab(3)"
          :class="` text-center text-indigo-darken-4 cursor-pointer ${
            activeTab == 3 & 'border-b-lg'
          } `"
          style="border-color: #0070fa !important"
        >
          <h3>Upload Files</h3>
          <span class="opacity-60">drag & drop reports or files</span>
        </v-col>
        <v-col cols="12" class="border-t-md">
          <template v-if="activeTab == 1">
            <the-search />
          </template>
          <template v-else-if="activeTab == 2">2</template>
          <template v-else-if="activeTab == 3">3</template>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
const variants = ["elevated", "flat", "tonal", "outlined"];
const color = ref("indigo");

const activeTab = ref("1");

const setTab = (id) => {
  activeTab.value = id;
};
</script>
