<template>
  <v-container>
    <v-layout>
      <the-header />
    </v-layout>
    <v-container>
      <v-row class="bg-grey-lighten-5 rounded-lg elevation-8 pa-6 mt-6">
        <v-col cols="12" class="rounded-lg overflow-hidden pa-0 bg-white">
          <div class="bg-grey-lighten-2 px-4 py-2">
            <span class="text-indigo-darken-4">#1</span>
            <v-icon
              icon="mdi-chevron-right"
              class="mx-3 text-cyan-accent-3"
              size="small"
            />
            <span class="text-light-blue-darken-4 font-weight-black"
              >Fabry Disease</span
            >
          </div>
          <v-row class="px-3 py-6">
            <v-col>
              <v-progress-circular
                color="cyan-accent-3"
                model-value="100"
                :size="36"
                :width="1"
              >
                <span class="text-body-2 text-indigo-darken-4">%89</span>
              </v-progress-circular>
            </v-col>
            <v-col cols="8" class="d-flex flex-column">
              <div>
                <span
                  class="px-3 py-1 border-sm rounded-lg d-inline-block font-weight-thin text-body-2 me-2 text-decoration-underline"
                  style="border-color: #ceeccf !important"
                  >ORPHA:324</span
                >
                <span
                  class="px-3 py-1 border-sm rounded-lg d-inline-block font-weight-thin text-body-2 text-decoration-underline"
                  style="border-color: #ceeccf !important"
                  >ORPHA:324</span
                >
              </div>
              <div class="mb-4"></div>
              <div>
                <p>
                  Fabry disease (FD) is a progressive, inherited, multisystemic
                  lysosomal storage disease characterized by specific
                  neurological, cutaneous, renal, cardiovascular,
                  cochleo-vestibular and cerebrovascular manifestations.
                </p>
              </div>
              <div class="mb-6"></div>
              <table class="text-grey-darken-3">
                <tr>
                  <td>Matched Symptoms</td>
                  <td>
                    <div class="d-flex flex-wrap">
                      <template
                        v-for="index in 6"
                        :key="index"
                      >
                        <div class="pa-1">
                          <div
                            class="d-flex align-center px-2 rounded bg-green-lighten-5"
                          >
                            <div class="mr-2">
                              isismsdfsdfs
                              <br />
                              <span class="font-weight-thin">sdfsdfsdf</span>
                            </div>
                            <v-icon
                              icon="mdi-close-circle-outline"
                              class="opacity-60"
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
                        v-for="index in 2"
                        :key="index"
                      >
                        <div class="pa-1">
                          <div
                            class="d-flex align-center px-2 rounded bg-orange-lighten-4"
                          >
                            <div class="mr-2">
                              isismsdfsdfs
                              <br />
                              <span class="font-weight-thin">sdfsdfsdf</span>
                            </div>
                            <v-icon
                              icon="mdi-close-circle-outline"
                              class="opacity-60"
                            />
                          </div>
                        </div>
                      </template>
                    </div>
                  </td>
                </tr>
              </table>
            </v-col>
            <v-col class="border-e-sm"></v-col>
            <v-col cols="3" class="d-flex flex-column justify-center">
              <div
                class="py-1 px-3 rounded-lg font-weight-black text-indigo-darken-4 bg-light-blue-lighten-5 text-decoration-underline cursor-pointer"
                @click="showReportDetail"
              >
                Show Case Reports (PubMed)
              </div>
              <div class="mb-4"></div>
              <div
                class="font-weight-black text-indigo-darken-4 text-decoration-underline"
              >
                Next Steps for Diagnosis
              </div>
              <div class="mb-4"></div>
              <div
                class="font-weight-black text-indigo-darken-4 text-decoration-underline"
              >
                Clinical Trials
              </div>
              <div class="mb-4"></div>
              <div
                class="font-weight-black text-indigo-darken-4 text-decoration-underline"
              >
                Treatments
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
  <report-detail-dialog
    id="234234234"
    v-model:reportDetailDialog="reportDetailDialog"
    :reportDetailDialogData="reportDetailDialogData"
  />
  {{reportDetailDialog}} - - {{reportDetailDialogData}}
</template>

<script setup>
const reportDetailDialog = ref(false);
const reportDetailDialogData = ref(null);

const showReportDetail = () => {
  console.log("wefwefwef");
  reportDetailDialog.value = true;
  reportDetailDialogData.value = [{ abc: "rweqrqwer" }];
};
</script>
