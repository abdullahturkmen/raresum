<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col
        cols="12"
        sm="11"
        md="10"
        class="border-md rounded-lg my-2 d-flex align-center flex-wrap"
      >
        <div style="width: 36px">
          <v-img :width="36" src="/icons/search.svg" />
        </div>
        <div class="d-flex flex-wrap">
          <template v-for="(item, index) in selectedDrugList" :key="index">
            <div class="pa-1">
              <div class="d-flex align-center px-2 rounded bg-green-lighten-5">
                <div class="mr-2">
                  <span class="font-weight-thin">1231241241234</span>
                  <br />
                  {{ item }}
                </div>
                <v-icon
                  icon="mdi-close-circle-outline"
                  @click="removeDrug(index)"
                  class="opacity-60"
                />
              </div>
            </div>
          </template>
        </div>
        <div class="w-50">
          <input
            style="outline: 0"
            type="text"
            class="text-grey-darken-1 border-0 w-100 mx-3"
            :placeholder="searchPlaceholder"
            v-model="searchInput"
            v-on:keyup.enter="addDrug"
          />
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center mt-1">
      <v-col cols="12" sm="11" md="10" class="pt-0">
        <div
          class="px-8 bg-white elevation-24 rounded-b-xl"
          style="max-height: 200px; overflow-y: auto"
        >
          <ul class="py-2 search-list">
            <template v-for="i in 8" :key="i">
              <the-list-item />
            </template>
          </ul>
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center py-6 mt-6">
      <v-btn
        class="px-10 text-none bg-green-accent-1 text-light-green-darken-4"
        size="x-large"
        flat
        rounded="lg"
        text="Search"
        append-icon="mdi-magnify"
      ></v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
const { $request } = useNuxtApp();
const searchInput = ref("");
const selectedDrugList = ref([]);

const addDrug = (val) => {
  if (val.target.value.length > 0) {
    selectedDrugList.value.push(val.target.value);
    searchInput.value = "";
  }
};

const removeDrug = (index) => {
  selectedDrugList.value.splice(index, 1);
};

const searchPlaceholder = computed(() => {
  return selectedDrugList.value.length === 0
    ? "Type patient’s signs and symptoms to add your search."
    : "";
});

const getSymptoms = async () => {
  $request
    .get("/symptoms")
    .then((response) => {
     console.log("semptomlar : ", response.data.items)
    })
    .catch((error) => {
      console.error("Hata:", error);
    });
};

getSymptoms()

</script>
