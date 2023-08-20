<script setup>
import Autocomplete from "./components/Autocomplete.vue";
import axios from "axios";
</script>

<template>
  <div class="flex justify-center min-h-screen items-center">
    <Autocomplete
      :inputLabel="'Async or Sync Search'"
      :inputDescription="'Search'"
      :asyncSearch="true"
      :searchOnFocus="true"
      :disable="false"
      @fetchAPIData="fetchAPIResults"
      :searchResult="searchResult"
    >
    </Autocomplete>
  </div>
</template>

<script>
export default {
  data() {
    return {
      api: "https://api.jikan.moe/v4/anime",
      searchResult: {},
    };
  },

  methods: {
    fetchAPIResults(searchQuery) {
      axios
        .get(this.api)
        .then((response) => {
          const test = response.data.data;
          let searchResult = {};
          if (searchQuery.length > 0) {
            for (const anime of test) {
              if (
                anime.title.toLowerCase().includes(searchQuery.toLowerCase())
              ) {
                searchResult[anime.title] = anime.title;
              }
            }

            if (Object.keys(searchResult).length === 0) {
              searchResult["test"] = "No result were found";
            }
          } else {
            searchResult["test"] = "No result were found";
          }

          this.searchResult = searchResult;
        })
        .catch((error) => {
          console.error("API call error", error);
        });
    },
  },
};
</script>

<style scoped></style>
