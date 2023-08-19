<template>
  <div>
    <ul
      :style="{
        borderStyle: searchQuery.length > 0 ? 'solid' : 'hidden',
      }"
      class="w-64 bg-white border rounded border-gray-300 shadow-md"
    >
      <li v-for="(result, country) in filteredResults" :key="country">
        <label
          class="pl-4 py-2 flex justify-between items-center hover:bg-blue-100 cursor-grab"
          :class="{ 'bg-blue-100': highlightedIndex === country }"
        >
          <span @click="selectResult(country)">
            {{ country }}
          </span>
          <input
            type="checkbox"
            v-model="selectedResults[country]"
            class="mr-2"
          />
        </label>
        <ul>
          <li
            v-for="(dish, dishIndex) in result.dishes"
            :key="dishIndex"
            class="pl-10 py-2 hover:bg-blue-100"
          >
            <label class="flex justify-between items-center cursor-grab">
              <span>{{ dish.name }}</span>
              <input
                type="checkbox"
                v-model="selectedResults[dish.name]"
                class="mr-2"
              />
            </label>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    searchQuery: String,
    asyncSearch: Boolean, // Asynchronous search function
    searchOnFocus: Boolean,
    disable: Boolean,
    data: Object,
  },

  data() {
    return {
      selectedResults: [],
      highlightedIndex: -1,
    };
  },

  computed: {
    filteredResults() {
      if (this.searchQuery.length > 0) {
        let searchResult = {};
        for (const country in this.data) {
          if (country.toLowerCase().includes(this.searchQuery.toLowerCase())) {
            searchResult[country] = this.data[country];
          }
        }

        if (Object.keys(searchResult).length === 0) {
          searchResult = { "No result were found": { dishes: [] } };
        }

        return searchResult;
      }
    },
  },
  methods: {
    selectResult(result) {
      if (result !== "No result were found") {
        this.searchQuery = result;
      }
    },

    handleArrowDownPressed(keyAction) {
      console.log(keyAction);
      this.highlightedIndex = 1; // Set the highlighted index to the first option
    },
  },
};
</script>
