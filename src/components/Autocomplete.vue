<script setup>
import NestedDropDown from "./NestedDropDown.vue";
import Loader from "./Loader.vue";
</script>

<template>
  <div class="flex justify-center min-h-screen items-center">
    <div class="absolute">
      <div class="mb-1 opacity-40">
        <label>{{ inputLabel }}</label>
      </div>
      <Popper
        @keydown.up.prevent="callHandleArrowDownPressed"
        @keydown.down.prevent="callHandleArrowDownPressed"
      >
        <div class="relative">
          <input
            v-model="inputQuery"
            class="border rounded px-4 py-2 w-64"
            :placeholder="inputDescription"
            @input="debouncedSearch"
          />
          <Loader :isLoading="isLoading"></Loader>
        </div>

        <template #content>
          <NestedDropDown
            :searchQuery="searchQuery"
            :asyncSearch="asyncSearch"
            :searchOnFocus="searchOnFocus"
            :disable="disable"
            :data="data"
            ref="NestedDropDownRef"
          >
          </NestedDropDown>
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
    data: Object,
  },

  components: {
    NestedDropDown,
  },

  data() {
    return {
      inputQuery: "",
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
        this.searchQuery = this.inputQuery;
        this.isLoading = false;
      }, TIMEOUT); 
    },

    callHandleArrowDownPressed(event) {
      this.$refs.NestedDropDownRef.handleArrowDownPressed(event.key);
    },
  },
};
</script>
