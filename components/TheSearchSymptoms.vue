<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col
        cols="12"
        sm="11"
        md="10"
        class="border-md rounded-lg my-2 d-flex align-center flex-wrap bg-white"
      >
        <div style="width: 36px">
          <v-img :width="36" src="/icons/search.svg" />
        </div>
        <div class="d-flex flex-wrap">
          <template v-for="(item, index) in selectedSymptomsList" :key="index">
            <div class="pa-1">
              <div class="d-flex align-center px-2 rounded bg-green-lighten-5">
                <div class="mr-2">
                  {{ item.code }}
                  <br />
                  <span class="font-weight-thin">{{ item.title }}</span>
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
        <div class="w-75 w-md-50">
          <input
            style="outline: 0"
            type="text"
            class="text-grey-darken-1 border-0 w-100 mx-3"
            :placeholder="searchPlaceholder"
            v-model="searchInput"
            ref="searchInputRef"
            @focus="onFocus"
            @input="onFocus"
            id="search-symptom-input"
            autofocus
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
          class="px-md-8 px-sm-4 px-2 bg-white elevation-24 rounded-lg mt-2"
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
      <template v-if="submitSymptomsBtnLoadingVisible">
        <v-progress-circular
          color="primary"
          indeterminate
          size="46"
        ></v-progress-circular>
      </template>
      <template v-else>
        <v-btn
          class="px-12 text-none bg-light-blue-darken-1 text-white text-body-2"
          size="x-large"
          flat
          rounded="lg"
          text="Search"
          :disabled="selectedSymptomsList?.length < 1"
          @click="submitSymptoms"
        ></v-btn>
      </template>
    </v-row>

    <the-symptom-detail-dialog
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
const submitSymptomsBtnLoadingVisible = ref(false);

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

const submitSymptoms = async () => {
  submitSymptomsBtnLoadingVisible.value = true;
};
</script>
