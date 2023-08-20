<script setup>
import Dropdown from "./Dropdown.vue";
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
    searchResult: Object,
  },

  components: {
    Dropdown,
  },

  data() {
    return {
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
        this.$emit("fetchAPIData", this.searchQuery);
        this.isLoading = false;
      }, TIMEOUT);
    },

    handleKeyboardNavigation(event) {
      this.$refs.DropdownRef.handleKeyboardNavigation(event.key);
    },
  },
};
</script>
