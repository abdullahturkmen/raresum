<template>
  <v-dialog v-model="localReportDetailDialog" max-width="800">
    <v-card class="rounded-lg">
      <div class="px-4 py-2">
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
      <v-data-table v-model:page="page" :headers="headers" :items="desserts">
        <template v-slot:[`item.pubmed`]="{ item }">
          <td>
            <div class="text-green bg-green-lighten-5 px-3 py-1 rounded-lg">
              {{ item.pubmed }}
            </div>
          </td>
        </template>

        <template v-slot:[`item.icon`]="">
          <td><v-icon icon="mdi-open-in-new" class="mx-1" /></td>
        </template>
        <template v-slot:bottom>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps(["reportDetailDialog", "reportDetailDialogData"]);
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
const desserts = ref([
  {
    year: "2019",
    title:
      "A Case of a 50-Year-Old Woman with Typical Fabry Disease Who Showed Serial Electrocardiographic and Echocardiographic Changes over a 17-Year Period.",
    journal: "Case Rep Cardiol",
    pubmed: "31065389",
  },
]);

const pageCount = computed(() => {
  return Math.ceil(this.desserts.length / this.itemsPerPage);
});
</script>
