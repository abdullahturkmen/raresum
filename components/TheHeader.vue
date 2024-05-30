<template>
  <v-container>
    <v-row class="rounded-lg bg-white">
      <v-col>
        <router-link to="/">
          <v-img :width="125" src="/logos/logo.svg" />
        </router-link>
      </v-col>
      <v-col cols="auto" class="justify-center d-none d-md-flex">
        <div class="d-flex align-center header-menu">
          <template v-for="(item, index) in menuList" :key="index">
            <router-link
              :to="item.routeName"
              active-class="text-blue-darken-3 font-weight-medium"
              class="mx-2 text-black text-decoration-none rounded-lg pa-2 header-menu--link font-500"
            >
              {{ item.name }}
            </router-link>
          </template>
        </div>
      </v-col>
      <v-col
        class="text-grey-darken-4 d-none d-md-flex justify-end align-center"
      >
        <template v-for="(item, index) in actionBtnList" :key="index">
          <router-link class="mx-1" :to="item.routeName">
            <v-btn
              :text="item.name"
              :color="item.color"
              :variant="item.variant"
              class="px-7 text-transform-unset"
            />
          </router-link>
        </template>
      </v-col>
      <v-col class="d-flex d-md-none justify-end align-center">
        <v-icon icon="mdi-menu" @click="drawerToggle" class="cursor-pointer" />
      </v-col>
    </v-row>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list nav dense>
        <router-link to="/">
          <v-img :width="125" src="/logos/logo.svg" class="mx-3 mb-5" />
        </router-link>
        <div class="d-flex flex-column header-menu">
          <template v-for="(item, index) in menuList" :key="index">
            <router-link
              :to="item.routeName"
              active-class="text-blue-darken-3 font-weight-medium"
              class="mx-2 text-black text-decoration-none rounded-lg pa-2 header-menu--link font-500"
            >
              {{ item.name }}
            </router-link>
          </template>
        </div>
        <div class="text-grey-darken-4 d-flex flex-column">
          <template v-for="(item, index) in actionBtnList" :key="index">
            <router-link class="my-2 ml-4" :to="item.routeName">
              <v-btn
                :text="item.name"
                :color="item.color"
                :variant="item.variant"
                class="text-transform-unset rounded-lg px-7"
              />
            </router-link>
          </template>
        </div>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script setup>
const menuList = ref([
  { name: "Home", routeName: "/" },
  { name: "About", routeName: "/" },
  { name: "For Hospitals", routeName: "/" },
  { name: "Sponsorship", routeName: "/" },
  { name: "Blog", routeName: "/" },
]);
const actionBtnList = ref([
  {
    name: "Login",
    routeName: "/",
    variant: "flat",
    color: "blue-grey-lighten-4",
  },
  { name: "Sing up", routeName: "/", variant: "flat", color: "blue-darken-3" },
]);
const drawer = ref(false);

const drawerToggle = () => {
  drawer.value = !drawer.value;
};
</script>
