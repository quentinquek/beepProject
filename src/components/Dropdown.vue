<template>
  <div>
    <ul
      :style="{
        borderStyle: searchQuery.length > 0 ? 'solid' : 'hidden',
      }"
      class="w-64 bg-white border rounded border-gray-300 shadow-md"
    >
      <li v-for="(result, value, index) in data" :key="index">
        <label
          class="pl-4 py-2 flex justify-between items-center hover:bg-blue-100 cursor-grab"
          :class="{ 'bg-blue-100': highlightedIndex === index }"
        >
          <span>
            {{ result }}
          </span>
          <input
            v-if="result !== 'No result were found'"
            type="checkbox"
            v-model="selectedResults"
            :value="result"
            class="mr-2"
          />
        </label>
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

  methods: {
    handleKeyboardNavigation(keyAction) {
      const dataLength = Object.values(this.data).length;
      if (keyAction == "ArrowDown") {
        this.highlightedIndex = (this.highlightedIndex + 1) % dataLength;
      } else if (keyAction == "ArrowUp") {
        this.highlightedIndex = (this.highlightedIndex - 1) % dataLength;
      } else if (keyAction === "Enter") {
        const selectedItem = Object.keys(this.data)[this.highlightedIndex];

        if (!this.selectedResults.includes(selectedItem)) {
          this.selectedResults.push(selectedItem);
        } else {
          this.selectedResults = this.selectedResults.filter(
            (item) => item !== selectedItem
          );
        }
      }
    },
  },
};
</script>
