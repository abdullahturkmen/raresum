<template>
  <v-dialog v-model="localReportDetailDialog" max-width="1200">
    <v-card class="rounded-lg">
      <div class="px-4 py-2">
        <span class="text-indigo-darken-4">#{{ props.selectedResult.id }}</span>
        <v-icon
          icon="mdi-chevron-right"
          class="mx-3 text-cyan-accent-3"
          size="small"
        />
        <span class="text-light-blue-darken-4 font-weight-black">{{
          props.selectedResult.title
        }}</span>
      </div>
      <v-data-table
        v-model:page="page"
        :headers="headers"
        :items="reportList"
        v-model:options="tableOptions"
      >
        <template v-slot:[`item.pubmed`]="{ item }">
          <td>
            <div class="text-green bg-green-lighten-5 px-3 py-1 rounded-lg">
              {{ item.pubmed }}
            </div>
          </td>
        </template>

        <template v-slot:[`item.title`]="{ item }">
          <td>
            <div class="font-weight-bold">
              {{ item.title }}
            </div>
          </td>
        </template>

        <template v-slot:[`item.icon`]="{ item }">
          <td>
            <a :href="item.url"
              ><v-icon icon="mdi-open-in-new" class="mx-1"
            /></a>
          </td>
        </template>
        <template v-slot:bottom>
          <v-col
            cols="12"
            class="py-0 d-flex align-center justify-space-between mt-6 mb-2"
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
      </v-data-table>
    </v-card>
  </v-dialog>
</template>

<script setup>
const { $request } = useNuxtApp();
const props = defineProps(["reportDetailDialog", "resultId", "selectedResult"]);
const emit = defineEmits(["update:reportDetailDialog"]);

const localReportDetailDialog = ref(props.reportDetailDialog);

watch(localReportDetailDialog, (newVal) => {
  emit("update:reportDetailDialog", newVal);
});

watch(
  () => props.reportDetailDialog,
  (newVal) => {
    localReportDetailDialog.value = newVal;
  }
);

const tableOptions = ref({
  sortBy: [],
  sortDesc: [],
  page: 1,
  itemsPerPage: 10,
});

const sortedColumn = ref("");

watch(
  () => tableOptions.value.sortBy,
  (newSortBy) => {
    sortedColumn.value = newSortBy.length > 0 ? newSortBy[0] : "none";
  },
  { immediate: true }
);

const page = ref(1);
const itemsPerPage = ref(5);
const headers = ref([
  {
    align: "start",
    key: "year",
    title: "Year",
  },
  { title: "Title", key: "title" },
  { title: "Journal", key: "journal" },
  { title: "PubMed", key: "pubmed" },
  { title: "", key: "icon" },
]);

const reportList = ref([]);

const getReport = async () => {
  if (!props.resultId) {
    return;
  }
  const params = {
    resultId: props?.resultId,
    ...(currentPageNum.value !== 1 && { pageNumber: currentPageNum.value }),
    ...(sortedColumn.value && {
      [sortedColumn.value.key]: sortedColumn.value.order,
    }),
  };
  $request
    .get("/reports", { params })
    .then((response) => {
      reportList.value = response.data.items;
      totalPageNum.value = response.data.totalPageCount;
    })
    .catch((error) => {
      console.error("Hata:", error);
    });
};

watch(sortedColumn, () => {
  getReport();
});

watch(props, () => {
  getReport();
});

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
  getReport();
});
</script>
