<template>
  <v-dialog v-model="props.symptomDetailDialog" width="auto">
    <v-card max-width="400" class="rounded-lg">
      <v-toolbar
        :title="
          props.symptomDetailDialogData.code +
          ' ' +
          props.symptomDetailDialogData.title
        "
      ></v-toolbar>
      <table class="pa-1">
        <tr>
          <td class="font-weight-bold px-1">HPO ID</td>
          <td>
            <u>{{ props.symptomDetailDialogData.code }}</u>
          </td>
        </tr>
        <tr>
          <td class="font-weight-bold px-1">Name</td>
          <td>{{ props.symptomDetailDialogData.title }}</td>
        </tr>
        <tr>
          <td class="font-weight-bold px-1">Definition</td>
          <td>{{ props.symptomDetailDialogData.definition }}</td>
        </tr>
        <tr>
          <td class="font-weight-bold px-1">Synonyms</td>
          <td>{{ props.symptomDetailDialogData.synonyms }}</td>
        </tr>
      </table>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps(["symptomDetailDialog", "symptomDetailDialogData"]);
</script>

<style lang="scss"></style>
