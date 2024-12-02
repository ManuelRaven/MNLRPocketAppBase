<template>
  <div class="h-100">
    <div class="sidebar bg-body">
      <strong class="app-title">MNLR_Base</strong>
      <TheSidebarNav />
    </div>
    <div class="content">
      <div class="hidenav">
        <BNavbar
          v-b-color-mode="'dark'"
          fixed="bottom"
          :toggleable="true"
          variant="primary"
        >
          <BNavbarToggle target="nav-collapse" />
          <BNavbarBrand href="#">MNLR_Base</BNavbarBrand>
        </BNavbar>

        <BOffcanvas placement="start" id="nav-collapse" is-nav>
          <TheSidebarNav></TheSidebarNav>
          <template #title>
            <strong class="app-title-canvas">MNLR_Base</strong>
          </template>
        </BOffcanvas>
      </div>
      <div class="container-fluid">
        <slot></slot>
      </div>
    </div>
  </div>
  <!-- <BNavbar v-b-color-mode="'dark'" toggleable="true" variant="primary">
    <BNavbarToggle target="nav-collapse" />
    <BNavbarBrand href="#">NavBar</BNavbarBrand>
  
  </BNavbar> -->
</template>
<script setup lang="ts">
import TheSidebarNav from "./TheSidebarNav.vue";
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  padding: 1rem;
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
}

.hidenav {
  display: none;
}

/* Hide Sidebar on small screens */
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }

  .hidenav {
    display: block;
  }
}

/* Set Content to full on small screens */

@media (max-width: 768px) {
  .content {
    margin-left: 0 !important;
    padding: 0rem;
  }
}

.content {
  margin-left: 250px;
  padding: 1rem;
  padding-bottom: 70px;
}

.app-title {
  display: block;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  text-align: center;
}

.app-title-canvas {
  display: block;
  font-size: 1.5rem;
  text-align: center;
}
</style>
