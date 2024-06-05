<template>
  <v-dialog max-width="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        text="Open Dialog"
        variant="flat"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Dialog">
        <v-data-table v-model:page="page" :headers="headers" :items="desserts">
            <template v-slot:item.pubmed="{ item }">
                <td style="">
                <v-btn> {{ item.pubmed }}</v-btn>
                </td>
              </template>

          <template v-slot:item.icon="{ item }">
            <td> <v-icon icon="mdi-open-in-new" class="mx-1" /></td>
          </template>
          <template v-slot:bottom>
            <div class="text-center pt-2">
              <v-pagination v-model="page" :length="pageCount"></v-pagination>
            </div>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      itemsPerPage: 5,
      headers: [
        {
          align: "start",
          key: "year",
          title: "Year",
        },
        { title: "Title", key: "title" },
        { title: "Journal", key: "journal" },
        { title: "PubMed", key: "pubmed" },
        { title: "", key: "icon" },
      ],
      desserts: [
        {
          year: "2019",
          title:
            "A Case of a 50-Year-Old Woman with Typical Fabry Disease Who Showed Serial Electrocardiographic and Echocardiographic Changes over a 17-Year Period.",
          journal: "Case Rep Cardiol",
          pubmed: "31065389",
        },
      ],
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.desserts.length / this.itemsPerPage);
    },
  },
};
</script>
