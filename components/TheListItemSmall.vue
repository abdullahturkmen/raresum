<template>
  <li
    class="d-flex justify-space-between w-100 px-2 py-3 rounded mb-1 bg-grey-lighten-4"
  >
    <div class="text-truncate text-body-2">
      <u class="font-weight-thin">{{ item.code }}</u> {{ item.title }}
    </div>
    <div class="text-grey-darken-2 d-flex text-body-2">
      <v-icon
        icon="mdi-information-slab-circle-outline"
        @click="symptomInfo(item.id)"
      />
      <v-icon icon="mdi-open-in-new" />
      <v-icon
        :icon="iconName"
        :class="`${active ? 'text-green' : 'text-grey'} `"
        @click="toggle(item.id)"
      />
    </div>
  </li>
</template>

<script setup>
const props = defineProps(["item"]);
const active = ref(false);
const iconName = ref("mdi-checkbox-blank-circle-outline");
const emit = defineEmits([
  "symptomSelectButtonClicked",
  "symptomInfoButtonClicked",
]);
const toggle = (id) => {
  emit("symptomSelectButtonClicked", id);
  active.value = !active.value;
  if (active.value) {
    iconName.value = "mdi-check-circle";
  } else {
    iconName.value = "mdi-checkbox-blank-circle-outline";
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
