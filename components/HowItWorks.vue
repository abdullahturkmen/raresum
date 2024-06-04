<template>
  <v-row class="align-center justify-center text-white">
    <v-col cols="12" class="text-center mt-3">
      <h4 class="text-h5 font-weight-bold">How it works?</h4>
    </v-col>

    <v-col cols="12" sm="8" md="9" lg="7">
      <v-row class="how-it-works">
        <template v-for="(item, index) in howItWorkList" :key="index">
          <v-col cols="12" md="4">
            <div class="item-num" :data-num="index + 1"></div>
            <div class="mb-1 mr-5">
              <h5 class="text-h6 font-weight-bold">
                {{ item.title }}
              </h5>
              <span class="text-body-2 font-weight-medium">{{
                item.subtitle
              }}</span>
            </div>
            <v-icon size="x-large" :icon="item.icon" class="text-h3" />
          </v-col>
        </template>
      </v-row>
    </v-col>
  </v-row>
</template>

<style lang="scss">
.how-it-works {
  position: relative;
  .item-num {
    height: 4px;
    background: #d2f4fc;
    width: calc(100% - 8px);
    float: right;
    position: relative;
    margin: 20px -8px 20px 0;

    &::before {
      content: attr(data-num);
      margin-left: -20px;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
      font-size: 24px;
      font-weight: bold;
      color: #d2f4fc;
    }
  }
}
</style>

<script setup>
const howItWorkList = ref([
  {
    title: "Complex patient? RareSum it.",
    subtitle: "Enter symptoms, anamnesis or add reports and search it.",
    icon: "mdi-account-edit-outline",
  },
  {
    title: "Get best-matching case study reports.",
    subtitle: "Reach insights with the power of AI and our algorithm.",
    icon: "mdi-chip",
  },
  {
    title: "Reach decision support and reference in minutes.",
    subtitle:
      "Explore rare diseases with sources & next step guidance at one stop.",
    icon: "mdi-hand-coin-outline",
  },
]);
</script>
