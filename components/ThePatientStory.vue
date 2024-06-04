<template>
  <v-container>
    <v-row class="d-flex justify-center align-center">
      <v-col cols="12" md="5">
        <v-textarea
          row-height="25"
          rows="8"
          max-rows="8"
          variant="outlined"
          auto-grow
          shaped
          hide-details
          no-resize
          v-model="patientStory"
        ></v-textarea>
      </v-col>
      <v-col cols="1" class="d-flex align-center justify-center">
        <v-icon
          icon="mdi-arrow-right-thin-circle-outline"
          class="d-none d-md-block text-h3 text-cyan-darken-1 opacity-40"
          size="x-large"
          @click="searchSymptoms"
          :disabled="patientStory?.length < 1"
        ></v-icon>
        <v-icon
          icon="mdi-arrow-down-thin-circle-outline"
          class="d-block d-md-none text-h3 text-cyan-darken-1 opacity-40"
          size="x-large"
          @click="searchSymptoms"
          :disabled="patientStory?.length < 1"
        ></v-icon>
      </v-col>
      <v-col cols="12" md="5">
        <div class="border-md rounded-lg pa-3">
          <div class="d-flex justify-space-between w-100">
            <h4>Symptoms observed in text:</h4>
            <span>add</span>
          </div>
          <div style="max-height: 172px; height: 172px; overflow-y: auto">
            <ul class="py-2 search-list">
              <template v-for="(item, index) in symptomSearchList" :key="index">
                <the-list-item-small
                  :item="item"
                  @symptomSelectButtonClicked="
                    handleSymptomSelectButtonClickedx
                  "
                  @symptomInfoButtonClicked="handleSymptomInfoButtonClickedx"
                />
              </template>
            </ul>
          </div>
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

    <the-symptom-dialog
      id="story"
      v-model:symptomDetailDialog="symptomDetailDialogx"
      :symptomDetailDialogData="symptomDetailDialogDatax"
    />
  </v-container>
</template>

<script setup>
const { $request } = useNuxtApp();

const patientStory = ref("");

const symptomSearchList = ref([]);

const symptomDetailDialogx = ref(false);
const symptomDetailDialogDatax = ref(null);

const handleSymptomSelectButtonClickedx = (id) => {
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

const handleSymptomInfoButtonClickedx = (id) => {
  symptomDetailDialogDatax.value = null;
  var searchSymptom = symptomSearchList.value.find((obj) => obj.id === id);
  symptomDetailDialogDatax.value = searchSymptom;
  symptomDetailDialogx.value = true;
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
