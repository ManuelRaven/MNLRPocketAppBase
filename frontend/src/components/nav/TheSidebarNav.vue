<template>
  <BNav vertical pills>
    <BNavItem>
      <BFormSelect v-model="mode">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </BFormSelect>
    </BNavItem>
    <BNavItem exact exact-active-class="active" :to="{ name: 'home' }"
      >Home</BNavItem
    >
    <BNavItem exact exact-active-class="active" :to="{ name: 'testing' }"
      >testing</BNavItem
    >
    <BNavItem>Link</BNavItem>
    <BNavItem>Another Link</BNavItem>
    <BNavItem disabled>Disabled</BNavItem>
    <BNavItemDropdown right>
      <!-- Using 'button-content' slot -->
      <template #button-content>
        <em>User</em>
      </template>
      <BDropdownItem href="#">Profile</BDropdownItem>
      <BDropdownItem @click="logout">Sign Out</BDropdownItem>
    </BNavItemDropdown>
    <!-- Right aligned nav items -->
    <BNavForm class="d-flex">
      <BFormInput class="me-2" placeholder="Search" />
      <BButton type="submit" variant="outline-success">Search</BButton>
    </BNavForm>
  </BNav>
</template>

<script setup lang="ts">
import { useAuth } from "@/composeables/useAuth";
import { BFormSelect, useColorMode } from "bootstrap-vue-next";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";

const auth = useAuth();
const router = useRouter();

const darkEnabled = ref(false);

const mode = useColorMode({
  persist: true,
});

watchEffect(() => {
  darkEnabled.value = mode.value === "dark";
});

const changeColor = () => {
  mode.value = mode.value === "dark" ? "light" : "dark";
};
const logout = async () => {
  await auth.logout();
  await router.replace("/login");
};
</script>

<style scoped></style>
