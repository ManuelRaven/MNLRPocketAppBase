<template>
  <div
    class="container justify-content-center vh-100 d-flex align-items-center"
  >
    <div class="w-100" style="max-width: 40rem">
      <BFormSelect v-model="mode" class="mb-3">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </BFormSelect>
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from "bootstrap-vue-next";
const mode = useColorMode({
  persist: true,
});
console.log("Hello from AnonymousLayout.vue");
</script>

<style scoped></style>
