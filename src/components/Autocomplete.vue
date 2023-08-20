<script setup>
import Dropdown from "./Dropdown.vue";
import axios from "axios";
import Loader from "./Loader.vue";
</script>

<template>
  <div class="flex justify-center min-h-screen items-center">
    <div class="absolute">
      <div class="mb-1 opacity-40">
        <label>{{ inputLabel }}</label>
      </div>
      <Popper
        @keydown.up.prevent="handleKeyboardNavigation"
        @keydown.down.prevent="handleKeyboardNavigation"
        @keydown.enter.prevent="handleKeyboardNavigation"
      >
        <div class="relative">
          <input
            v-model="searchQuery"
            class="border rounded px-4 py-2 w-64"
            :class="searchOnFocus ? '' : 'focus:outline-none'"
            :disabled="disable"
            :placeholder="inputDescription"
            @input="debouncedSearch"
          />
          <Loader :isLoading="isLoading"></Loader>
        </div>

        <template #content>
          <Dropdown
            :searchQuery="searchQuery"
            :asyncSearch="asyncSearch"
            :searchOnFocus="searchOnFocus"
            :disable="disable"
            :data="searchResult"
            ref="DropdownRef"
          >
          </Dropdown>
        </template>
      </Popper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inputLabel: String,
    inputDescription: String,
    asyncSearch: Boolean, // Asynchronous search function
    searchOnFocus: Boolean,
    disable: Boolean,
    data: String,
  },

  components: {
    Dropdown,
  },

  data() {
    return {
      searchResult: {},
      searchQuery: "",
      debounceTimer: null,
      isLoading: false,
    };
  },

  methods: {
    debouncedSearch() {
      clearTimeout(this.debounceTimer);

      let TIMEOUT = 0; // Adjust the debounce delay as needed
      if (this.asyncSearch) {
        TIMEOUT = 1000;
        this.isLoading = true;
      }

      this.debounceTimer = setTimeout(() => {
        if (this.searchQuery.length > 0) {
          this.fetchAPIResults();
        }
      }, TIMEOUT);
    },

    fetchAPIResults() {
      axios
        .get(this.data)
        .then((response) => {
          const test = response.data.data;
          let searchResult = {};
          for (const anime of test) {
            if (
              anime.title.toLowerCase().includes(this.searchQuery.toLowerCase())
            ) {
              searchResult[anime.title] = anime.title;
            }
          }
          this.searchResult = searchResult;

          if (Object.keys(searchResult).length === 0) {
            searchResult["test"] = "No result were found";
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.error("API call error", error);
        });
    },

    handleKeyboardNavigation(event) {
      this.$refs.DropdownRef.handleKeyboardNavigation(event.key);
    },
  },
};
</script>
