<template>
  <v-container>
    <v-layout>
      <the-header />
    </v-layout>
    <v-container>
      <v-row class="bg-grey-lighten-5 rounded-lg elevation-8 pa-2 mt-6 pa-md-6">
        <template v-if="resultList.length">
          <v-col
            cols="12"
            class="rounded-lg overflow-hidden pa-0 bg-white"
            v-for="(result, index) in resultList"
            :key="index"
          >
            <div class="bg-grey-lighten-2 px-4 py-2">
              <span class="text-indigo-darken-4">#{{ result.id }}</span>
              <v-icon
                icon="mdi-chevron-right"
                class="mx-3 text-cyan-accent-3"
                size="small"
              />
              <span class="text-light-blue-darken-4 font-weight-black">{{
                result.title
              }}</span>
            </div>
            <v-row class="px-3 py-6">
              <v-col cols="auto">
                <v-progress-circular
                  color="cyan-accent-3"
                  model-value="100"
                  :size="36"
                  :width="1"
                >
                  <span class="text-body-2 text-indigo-darken-4"
                    >%{{ result.percent }}</span
                  >
                </v-progress-circular>
              </v-col>
              <v-col cols="11" lg="8"  class="d-flex flex-column">
                <div>
                  <span
                    v-for="(category, catIndex) in result.categories"
                    :key="catIndex"
                    class="px-3 py-1 border-sm rounded-lg d-inline-block font-weight-thin text-body-2 me-2 text-decoration-underline"
                    style="border-color: #ceeccf !important"
                    >{{ category.name }}</span
                  >
                </div>
                <div class="mb-4"></div>
                <div>
                  <p>
                    {{ result.description }}
                  </p>
                </div>
                <div class="mb-6"></div>
                <table class="text-grey-darken-3">
                  <tr>
                    <td>Matched Symptoms</td>
                    <td>
                      <div class="d-flex flex-wrap">
                        <template
                          v-for="(symptom, symptomIndex) in result.symptoms"
                          :key="symptomIndex"
                        >
                          <div class="pa-1">
                            <div
                              class="d-flex align-center px-2 rounded bg-green-lighten-5"
                            >
                              <div class="mr-2">
                                {{ symptom.code }}
                                <br />
                                <span class="font-weight-thin">{{
                                  symptom.title
                                }}</span>
                              </div>
                              <v-icon
                                size="small"
                                icon="mdi-check-circle"
                                class="opacity-60 text-green-darken-4"
                              />
                            </div>
                          </div>
                        </template>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Other</td>
                    <td>
                      <div class="d-flex flex-wrap">
                        <template
                          v-for="(other, otherIndex) in result.others"
                          :key="otherIndex"
                        >
                          <div class="pa-1">
                            <div
                              class="d-flex align-center px-2 rounded bg-orange-lighten-5"
                            >
                              <div class="mr-2">
                                {{ other.code }}
                                <br />
                                <span class="font-weight-thin">
                                  {{ other.title }}</span
                                >
                              </div>
                              <v-icon
                                size="small"
                                icon="mdi-checkbox-blank-circle-outline"
                                class="opacity-60 text-orange-darken-4"
                              />
                            </div>
                          </div>
                        </template>
                      </div>
                    </td>
                  </tr>
                </table>
              </v-col>
              <v-col cols="12" lg="auto">
                <div class="border-sm w-100 h-100 "></div>
              </v-col>
              <v-col cols="12" lg="3" class="d-flex flex-lg-column flex-row justify-center align-center align-lg-start flex-wrap">
                <div
                  class="mx-1 py-1 px-3 rounded-lg font-weight-black text-indigo-darken-4 bg-light-blue-lighten-5 text-decoration-underline cursor-pointer"
                  @click="showReportDetail(result)"
                >
                  Show Case Reports (PubMed)
                </div>
                <div class="mb-4"></div>
                <div
                  class="mx-1 font-weight-black text-indigo-darken-4 text-decoration-underline"
                >
                  <a href="" class="text-indigo-darken-4"
                    >Next Steps for Diagnosis</a
                  >
                </div>
                <div class="mb-4"></div>
                <div
                  class="mx-1 font-weight-black text-indigo-darken-4 text-decoration-underline"
                >
                  <a href="" class="text-indigo-darken-4">Clinical Trials</a>
                </div>
                <div class="mb-4"></div>
                <div
                  class="mx-1 font-weight-black text-indigo-darken-4 text-decoration-underline"
                >
                  <a href="" class="text-indigo-darken-4">Treatments</a>
                </div>
              </v-col>
            </v-row>
          </v-col>

          <v-col
            cols="12"
            class="pa-0 d-flex align-center justify-space-between mt-8"
            v-if="totalPageNum > 0"
          >
            <v-btn
              size="small"
              text="Previous"
              class="text-body-2 font-500"
              variant="text"
              prepend-icon="mdi-arrow-left"
              :disabled="currentPageNum == 1"
              @click="prevPage"
            />
            <v-pagination
              v-model="currentPageNum"
              :length="totalPageNum"
              :total-visible="6"
              prev-icon=""
              next-icon=""
            ></v-pagination>
            <v-btn
              size="small"
              text="Next"
              class="text-body-2 font-500"
              variant="text"
              append-icon="mdi-arrow-right"
              :disabled="currentPageNum == totalPageNum"
              @click="nextPage()"
            />
          </v-col>
        </template>
        <template v-else>
          <div class="d-flex justify-center align-center py-12 my-12 w-100">
            <v-progress-circular
              color="primary"
              indeterminate
              size="72"
            ></v-progress-circular>
          </div>
        </template>
      </v-row>
    </v-container>
  </v-container>
  <the-result-detail-dialog
    v-model:reportDetailDialog="reportDetailDialog"
    :resultId="resultId"
    :selectedResult="selectedResult"
  />
</template>

<script setup>
const { $request } = useNuxtApp();
import { useRouter } from "vue-router";
const router = useRouter();
const reportDetailDialog = ref(false);
const resultId = ref(null);
const selectedResult = ref(null);
const resultList = ref([]);

const showReportDetail = (detail) => {
  reportDetailDialog.value = true;
  resultId.value = detail.id;
  selectedResult.value = detail;
};

const getResults = async () => {
  if (isLocalStorageItemEmpty("selectedSymptomsList")) {
    return router.push("/");
  }
  const params = {
    selectedSymptomsList: localStorage.getItem("selectedSymptomsList"),
    ...(currentPageNum.value !== 1 && { pageNumber: currentPageNum.value }),
  };
  $request
    .get("/result", { params })
    .then((response) => {
      resultList.value = response.data.items;
      totalPageNum.value = response.data.totalPageCount;
    })
    .catch((error) => {
      console.error("Hata:", error);
    });
};

onMounted(() => {
  getResults();

  if (isLocalStorageItemEmpty("selectedSymptomsList")) {
    return router.push("/");
  }
});

const isLocalStorageItemEmpty = (key) => {
  const item = localStorage.getItem(key);
  return item === null || item === "";
};

const currentPageNum = ref(1);
const totalPageNum = ref(0);

const prevPage = () => {
  if (currentPageNum.value > 1) {
    return currentPageNum.value--;
  }
};

const nextPage = () => {
  if (currentPageNum.value < totalPageNum.value) {
    return currentPageNum.value++;
  }
};

watch(currentPageNum, () => {
  getResults();
});
</script>
