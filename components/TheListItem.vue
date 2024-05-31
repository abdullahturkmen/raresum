<template>
  <li
    :class="`d-flex justify-space-between w-100 px-2 py-3 rounded mb-1 ${
      active ? 'bg-green-lighten-4' : 'bg-grey-lighten-4'
    } `"
  >
    <div><u>HP:0032249</u> Coccidioidomycosis | Valley fever</div>
    <div class="text-grey-darken-2">
      <v-icon icon="mdi-information-slab-circle-outline" />
      <v-icon icon="mdi-export-variant" />
      <template v-if="active">
        <v-icon icon="mdi-check-circle" class="text-green" @click="toggle" />
      </template>
      <template v-else>
        <v-icon icon="mdi-plus-circle" @click="toggle" />
      </template>
    </div>
  </li>
</template>

<script setup>
const active = ref(false);

const toggle = () => {
  active.value = !active.value;
};
</script>

<style lang="scss">

.search-list > li {
  &:hover {
      background-color: #e0e2e7 !important;
  }
}
</style>
