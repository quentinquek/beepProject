<!-- <script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});
</script> -->

<template>
  <div class="flex justify-center min-h-screen items-center">
    <div class="absolute">
      <!-- <label>Insert here later</label> -->
      <Popper>
        <input
          v-model="searchQuery"
          @blur="isDropdownOpen = false"
          class="border rounded px-4 py-2 w-64"
          placeholder="Search..."
        />
        <template #content>
          <ul
            :style="{
              borderStyle: searchQuery.length > 0 ? 'solid' : 'hidden',
            }"
            class="w-64 bg-white border rounded border-gray-300 shadow-md"
          >
            <li
              v-for="(result, index) in filteredResults"
              :key="index"
              class="px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
            >
              <span>{{ result }}</span>
              <input
                type="checkbox"
                :value="result"
                v-model="selectedResults"
                @click="selectResult(result)"
              />
            </li>
          </ul>
        </template>
      </Popper>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      results: ["Apple", "Banana", "Cherry", "Date", "Fig", "Grape"],
    };
  },
  computed: {
    filteredResults() {
      if (this.searchQuery.length > 0) {
        let searchResult = this.results.filter((result) =>
          result.toLowerCase().includes(this.searchQuery.toLowerCase())
        );

        if (searchResult.length == 0) {
          searchResult = ["No result were found"];
        }

        return searchResult;
      }
    },
  },
  methods: {
    selectResult(result) {
      this.searchQuery = result;
    },
  },
};
</script>

<style scoped></style>
