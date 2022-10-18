<script setup lang="ts">
const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<template>
    <v-app>
        <v-toolbar floating :elevation="8" color="primary">
          <v-btn
            icon="mdi-menu"
            @click="toggleLeftDrawer"
          />
          <v-toolbar-title>
            Vuetify App
          </v-toolbar-title>
        </v-toolbar>
        <v-navigation-drawer
          permanent
          v-model="leftDrawerOpen"
        >
        <v-list
          density="compact"
          nav
        >
          <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-container>
          <slot />
        </v-container>
      </v-main>
    </v-app>
</template>