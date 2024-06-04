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
          <template v-for="(item, index) in selectedSymptomsList" :key="index">
            <div class="pa-1">
              <div class="d-flex align-center px-2 rounded bg-green-lighten-5">
                <div class="mr-2">
                  <span class="font-weight-thin">{{ item.code }}</span>
                  <br />
                  {{ item.title }}
                </div>
                <v-icon
                  icon="mdi-close-circle-outline"
                  @click="removeSymptom(item.id)"
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
            ref="searchInputRef"
            @focus="onFocus"
            @input="onFocus"
          />
        </div>
      </v-col>
    </v-row>
    <v-row
      class="d-flex justify-center mt-1"
      v-if="symptomSearchList?.length > 0"
    >
      <v-col cols="12" sm="11" md="10" class="pt-0 px-0">
        <div
          class="px-8 bg-white elevation-24 rounded-lg mt-2"
          style="max-height: 200px; overflow-y: auto"
          ref="searchListRef"
        >
          <ul class="py-2 search-list">
            <template v-for="(item, index) in symptomSearchList" :key="index">
              <the-list-item
                :item="item"
                @symptomSelectButtonClicked="handleSymptomSelectButtonClicked"
                @symptomInfoButtonClicked="handleSymptomInfoButtonClicked"
              />
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
        :disabled="selectedSymptomsList?.length < 1"
      ></v-btn>
    </v-row>

    <the-symptom-dialog
      id="search"
      :symptomDetailDialog="symptomDetailDialog"
      :symptomDetailDialogData="symptomDetailDialogData"
    />
  </v-container>
</template>

<script setup>
const { $request } = useNuxtApp();
const searchInput = ref("");
const selectedSymptomsList = ref([]);

const searchPlaceholder = computed(() => {
  return selectedSymptomsList.value.length === 0
    ? "Type patient’s signs and symptoms to add your search."
    : "";
});

const getSymptoms = async () => {
  const params = {};
  if (searchInput.value) {
    params.title = searchInput.value;
  }
  $request
    .get("/symptoms", { params })
    .then((response) => {
      symptomSearchList.value = response.data.items;
    })
    .catch((error) => {
      console.error("Hata:", error);
    });
};

const symptomSearchList = ref([]);
const searchInputRef = ref(null);
const searchListRef = ref(null);
const isInputFocused = ref(false);

const onFocus = () => {
  isInputFocused.value = true;
  getSymptoms();
};

const onClickOutside = (event) => {
  if (
    isInputFocused.value &&
    !searchInputRef.value.contains(event.target) &&
    !searchListRef.value.contains(event.target)
  ) {
    isInputFocused.value = false;
    symptomSearchList.value = [];
    symptomDetailDialog.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", onClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onClickOutside);
});

const handleSymptomSelectButtonClicked = (id) => {
  var searchSymptom = symptomSearchList.value.find((obj) => obj.id === id);
  var checkSymptom = selectedSymptomsList.value.find((obj) => obj.id === id);

  if (checkSymptom?.id) {
    var indexToRemove = selectedSymptomsList.value.findIndex(
      (obj) => obj.id === id
    );
    if (indexToRemove !== -1) {
      selectedSymptomsList.value.splice(indexToRemove, 1);
    }
  } else {
    selectedSymptomsList.value.push(searchSymptom);
  }
};

const removeSymptom = (id) => {
  var indexToRemove = selectedSymptomsList.value.findIndex(
    (obj) => obj.id === id
  );
  if (indexToRemove !== -1) {
    selectedSymptomsList.value.splice(indexToRemove, 1);
  }
};

const symptomDetailDialog = ref(false);
const symptomDetailDialogData = ref(null);

const handleSymptomInfoButtonClicked = (id) => {
  symptomDetailDialogData.value = null;
  var searchSymptom = symptomSearchList.value.find((obj) => obj.id === id);
  symptomDetailDialogData.value = searchSymptom;
  symptomDetailDialog.value = true;
};
</script>
