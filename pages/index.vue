<template>
  <v-container>
    <v-layout>
      <the-header />
    </v-layout>
    <v-container>
      <v-row class="justify-center text-center">
        <v-col cols="12" md="9" sm="10">
          <div class="mb-3 mb-md-6"></div>
          <h1
            class="text-h4 text-sm-h3 text-md-h2 text-white font-weight-medium"
          >
            One stop go-to-reference tool.
          </h1>
          <div class="mb-2 mb-md-4"></div>
          <div class="text-white text-body-1 text-md-h6 px-8">
            Harness the power of AI and intelligence for rare disease
            diagnostics. Decision support in minutes, at one stop.
          </div>
          <div class="mb-3 mb-md-6"></div>
        </v-col>
      </v-row>
      <v-row class="bg-grey-lighten-5 rounded-lg elevation-8">
        <v-col
          @click="setTab(1)"
          :class="`mx-3  text-center cursor-pointer ${
            activeTab == 1
              ? 'border-b-lg text-light-blue-darken-4'
              : 'border-b-md text-grey-darken-1'
          } `"
          :style="`${activeTab == 1 && 'border-color: #0070fa !important'}`"
        >
        <label for="search-symptom-input" class="cursor-pointer">
          <h4 class="text-body-1 text-sm-h6">Quick Add</h4>
          <span class="opacity-60 d-none d-sm-block"
            >find & add symptoms from menu</span
          >
        </label>
        </v-col>
        <v-col
          @click="setTab(2)"
          :class="`mx-1 text-center cursor-pointer ${
            activeTab == 2
              ? 'border-b-lg text-light-blue-darken-4'
              : 'border-b-md text-grey-darken-1'
          } `"
          :style="`${activeTab == 2 && 'border-color: #0070fa !important'}`"
        >
          <h4 class="text-body-1 text-sm-h6">Free Text</h4>
          <span class="opacity-60 d-none d-sm-block"
            >type or copy & paste patient story</span
          >
        </v-col>
        <v-col
          @click="setTab(3)"
          :class="`mx-3 text-center cursor-pointer ${
            activeTab == 3
              ? 'border-b-lg text-light-blue-darken-4'
              : 'border-b-md text-grey-darken-1'
          } `"
          :style="`${activeTab == 3 && 'border-color: #0070fa !important'}`"
        >
          <h4 class="text-body-1 text-sm-h6">Upload Files</h4>
          <span class="opacity-60 d-none d-sm-block"
            >drag & drop reports or files</span
          >
        </v-col>
        <v-col cols="12">
          <template v-if="activeTab == 1">
            <the-search-symptoms />
          </template>
          <template v-else-if="activeTab == 2">
            <the-patient-story />
          </template>
          <template v-else-if="activeTab == 3">
            <the-upload-files />
          </template>
        </v-col>
      </v-row>
      <how-it-works />
    </v-container>
  </v-container>
</template>

<script setup>
const activeTab = ref("1");

const setTab = (id) => {
  activeTab.value = id;
};
</script>
