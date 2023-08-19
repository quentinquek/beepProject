<script setup>
import Autocomplete from "./components/Autocomplete.vue";
</script>

<template>
  <div class="flex justify-center min-h-screen items-center">
    <Autocomplete
      :inputLabel="'Async or Sync Search'"
      :inputDescription="'Search by country or food'"
      :asyncSearch="true"
      :searchOnFocus="true"
      :disable="false"
      :data="inputTestData"
    >
    </Autocomplete>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputTestData: {
        Japan: {
          dishes: [
            {
              name: "Sushi",
            },
            {
              name: "Ramen",
            },
          ],
        },
        Italy: {
          dishes: [
            {
              name: "Pizza Margherita",
            },
            {
              name: "Pasta Carbonara",
            },
          ],
        },
        USA: {
          dishes: [
            {
              name: "Hamburger",
            },
            {
              name: "Apple Pie",
            },
          ],
        },
        Mexico: {
          dishes: [
            {
              name: "Tacos",
            },
            {
              name: "Guacamole",
            },
          ],
        },
        India: {
          dishes: [
            {
              name: "Chicken Tikka Masala",
            },
            {
              name: "Biryani",
            },
          ],
        },
      },
    };
  },
};
</script>

<style scoped></style>
