<template>
  <li
    :class="`d-flex justify-space-between w-100 px-2 py-3 rounded mb-1 ${
      active ? 'bg-green-lighten-4' : 'bg-grey-lighten-4'
    } `"
  >
    <div>
      <u>{{ item.code }}</u> {{ item.title }}
    </div>
    <div class="text-grey-darken-2">
      <v-icon icon="mdi-information-slab-circle-outline" />
      <v-icon icon="mdi-export-variant" />
      <v-icon
        :icon="iconName"
        :class="`${active && 'text-green'} `"
        @click="toggle(item.id)"
      />
    </div>
  </li>
</template>

<script setup>
const props = defineProps(["item"]);
const active = ref(false);
const iconName = ref("mdi-plus-circle");
const emit = defineEmits(["symptomSelectButtonClicked"]);
const toggle = (id) => {
  emit("symptomSelectButtonClicked", id);
  active.value = !active.value;
  if (active.value) {
    iconName.value = "mdi-check-circle";
  } else {
    iconName.value = "mdi-plus-circle";
  }
};
</script>

<style lang="scss">
.search-list > li {
  &:hover {
    background-color: #e0e2e7 !important;
  }
}
</style>
