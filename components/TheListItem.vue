<template>
  <li
    :class="`d-flex justify-space-between w-100 px-2 py-3 rounded mb-1 ${
      item.isSelected ? 'bg-green-lighten-4' : 'bg-grey-lighten-4'
    } `"
  >
    <div class="text-truncate">
      <u>{{ item.code }}</u> {{ item.title }}
    </div>
    <div class="text-grey-darken-2 d-flex">
      <v-icon
        class="mx-1"
        icon="mdi-information-slab-circle-outline"
        @click="symptomInfo(item.id)"
      />
      <v-icon icon="mdi-open-in-new" class="mx-1" />
      <v-icon :icon="iconName" class="mx-1" @click="toggle(item.id)" />
    </div>
  </li>
</template>

<script setup>
const props = defineProps(["item"]);
const iconName = ref("mdi-plus-circle-outline");
const emit = defineEmits([
  "symptomSelectButtonClicked",
  "symptomInfoButtonClicked",
]);
const toggle = (id) => {
  emit("symptomSelectButtonClicked", id);
  props.item.isSelected = !props.item.isSelected;
  if (props.item.isSelected) {
    iconName.value = "mdi-check-circle";
  } else {
    iconName.value = "mdi-plus-circle-outline";
  }
};

const symptomInfo = (id) => {
  emit("symptomInfoButtonClicked", id);
};
</script>

<style lang="scss">
.search-list > li {
  &:hover {
    background-color: #e0e2e7 !important;
  }
}
</style>
