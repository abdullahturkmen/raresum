<template>
  <v-container>
    <v-row class="d-flex justify-center align-center">
      <v-col cols="12" md="5">
        <div class="border-md rounded-lg pa-3 bg-white">
          <drop-zone @emit-files="getFiles" />
        </div>
      </v-col>
      <v-col cols="1" class="d-flex align-center justify-center">
        <template v-if="searchLoadingCircleVisible">
          <v-progress-circular
            color="primary"
            indeterminate
            size="46"
          ></v-progress-circular>
        </template>
        <template v-else>
          <div class="bg-teal-lighten-4 border-sm rounded-circle pa-3">
            <v-icon
              icon="mdi-arrow-right-thin"
              class="d-none d-md-block text-h6 text-cyan-darken-1 opacity-80"
              size="x-large"
              @click="searchSymptoms"
              :disabled="incomingFileList?.length < 1"
            ></v-icon>
            <v-icon
              icon="mdi-arrow-down-thin"
              class="d-block d-md-none text-h6 text-cyan-darken-1 opacity-80"
              size="x-large"
              @click="searchSymptoms"
              :disabled="incomingFileList?.length < 1"
            ></v-icon>
          </div>
        </template>
      </v-col>
      <v-col cols="12" md="5">
        <div class="border-md rounded-lg pa-3 bg-white">
          <div class="d-flex justify-space-between w-100">
            <h4>Symptoms observed in text:</h4>
            <span class="text-grey-darken-1">add</span>
          </div>
          <div style="max-height: 172px; height: 172px; overflow-y: auto">
            <ul class="py-2 search-list">
              <template v-for="(item, index) in symptomSearchList" :key="index">
                <the-list-item-small
                  :item="item"
                  @symptomSelectButtonClicked="handleSymptomSelectButtonClicked"
                  @symptomInfoButtonClicked="handleSymptomInfoButtonClicked"
                />
              </template>
            </ul>
          </div>
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
          @click="submitSymptoms"
          :disabled="selectedSymptomsList?.length < 1"
        ></v-btn>
      </template>
    </v-row>

    <the-symptom-detail-dialog
      id="upload-file"
      v-model:symptomDetailDialog="symptomDetailDialog"
      :symptomDetailDialogData="symptomDetailDialogData"
    />
  </v-container>
</template>

<script setup>
const { $request } = useNuxtApp();
import { useRouter } from "vue-router";
const router = useRouter();
const submitSymptomsBtnLoadingVisible = ref(false);
const symptomSearchList = ref([]);
const selectedSymptomsList = ref([]);
const searchLoadingCircleVisible = ref(false);

const incomingFileList = ref([]);
const getFiles = (fileList) => {
  incomingFileList.value = fileList;
};

const symptomDetailDialog = ref(false);
const symptomDetailDialogData = ref(null);

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

const handleSymptomInfoButtonClicked = (id) => {
  symptomDetailDialogData.value = null;
  var searchSymptom = symptomSearchList.value.find((obj) => obj.id === id);
  symptomDetailDialogData.value = searchSymptom;
  symptomDetailDialog.value = true;
};

const searchSymptoms = async () => {
  searchLoadingCircleVisible.value = true;
  const formData = new FormData();
  incomingFileList.value.forEach((file) => {
    formData.append("selectedFiles", file);
  });

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  $request
    .post("/upload-files", formData, config)
    .then((response) => {
      symptomSearchList.value = response.data.items;
    })
    .catch((error) => {
      console.error("Hata:", error);
    })
    .finally((e) => {
      searchLoadingCircleVisible.value = false;
    });
};

const submitSymptoms = async () => {
  submitSymptomsBtnLoadingVisible.value = true;
  const jsonString = JSON.stringify(selectedSymptomsList.value);
  localStorage.setItem("selectedSymptomsList", jsonString);
  setTimeout(() => {
    router.push("/result");
  }, 1000);
};
</script>
