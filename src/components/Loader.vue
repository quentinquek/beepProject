<template>
  <svg
    v-if="isLoading"
    class="absolute top-3 right-3 animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
    <circle
      class="text-black opacity-20"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.885 3.189 8.076l2.011-2.011zM12 20a8 8 0 100-16 8 8 0 000 16zm5.291-18.189A7.962 7.962 0 0012 4V0c3.042 0 5.885 1.135 8.076 3.189l-2.011 2.011z"
    ></path>
  </svg>
</template>

<script>
export default {
    props: {
        isLoading: Boolean,
    },
}
</script>

<style scoped>
</style>
