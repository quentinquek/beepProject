<script setup>
import Autocomplete from "./components/Autocomplete.vue";
</script>

<template>
  <div class="flex justify-center min-h-screen items-center">
    <Autocomplete
      :inputLabel="'Async or Sync Search'"
      :inputDescription="'Search'"
      :asyncSearch="true"
      :searchOnFocus="true"
      :disable="false"
      :data="api"
    >
    </Autocomplete>
  </div>
</template>

<script>
export default {
  data() {
    return {
      api: "https://api.jikan.moe/v4/anime",
    };
  },
};
</script>

<style scoped></style>
