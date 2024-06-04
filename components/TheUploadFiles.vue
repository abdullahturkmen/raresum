<template>
  <v-container>
    <v-row class="d-flex justify-center align-center">
      <v-col cols="12" md="5">
        <div class="border-md rounded-lg pa-3 bg-white">sdfgdsfgssdfg</div>
      </v-col>
      <v-col cols="1" class="d-flex align-center justify-center">
        <div
          :class="`bg-teal-lighten-4 border-sm rounded-circle pa-3 ${
            patientStory?.length < 1 && 'opacity-60'
          } `"
        >
          <v-icon
            icon="mdi-arrow-right-thin"
            class="d-none d-md-block text-h6 text-cyan-darken-1 opacity-80"
            size="x-large"
            @click="searchSymptoms"
          ></v-icon>
          <v-icon
            icon="mdi-arrow-down-thin"
            class="d-block d-md-none text-h6 text-cyan-darken-1 opacity-80"
            size="x-large"
            @click="searchSymptoms"
          ></v-icon>
        </div>
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
      <v-btn
        class="px-12 text-none bg-light-blue-darken-1 text-white text-body-2"
        size="x-large"
        flat
        rounded="lg"
        text="Search"
      ></v-btn>
    </v-row>

    <the-symptom-detail-dialog
      id="upload-file"
      :symptomDetailDialog="symptomDetailDialog"
      :symptomDetailDialogData="symptomDetailDialogData"
    />
  </v-container>
</template>

<script setup>
const { $request } = useNuxtApp();

const symptomSearchList = ref([]);

const symptomDetailDialog = ref(false);
const symptomDetailDialogData = ref(null);

const handleSymptomSelectButtonClicked = (id) => {
  console.log("id : ", id);
  // var searchSymptom = symptomSearchList.value.find((obj) => obj.id === id);
  // var checkSymptom = selectedSymptomsList.value.find((obj) => obj.id === id);

  // if (checkSymptom?.id) {
  //   var indexToRemove = selectedSymptomsList.value.findIndex(
  //     (obj) => obj.id === id
  //   );
  //   if (indexToRemove !== -1) {
  //     selectedSymptomsList.value.splice(indexToRemove, 1);
  //   }
  // } else {
  //   selectedSymptomsList.value.push(searchSymptom);
  // }
};

const handleSymptomInfoButtonClicked = (id) => {
  symptomDetailDialogData.value = null;
  var searchSymptom = symptomSearchList.value.find((obj) => obj.id === id);
  symptomDetailDialogData.value = searchSymptom;
  symptomDetailDialog.value = true;
};

const searchSymptoms = () => {
  const params = {
    description: patientStory.value,
  };

  $request
    .get("/symptoms", { params })
    .then((response) => {
      symptomSearchList.value = response.data.items;
    })
    .catch((error) => {
      console.error("Hata:", error);
    });
};
</script>
