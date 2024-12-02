<template>
  <div>
    <BCardGroup>
      <BCard title="BoostrapVueNext">
        <a href="https://bootstrap-vue-next.github.io/" target="_blank"
          >https://bootstrap-vue-next.github.io/</a
        >
      </BCard>
      <BCard title="Toasts">
        <p>
          <BButton @click="show?.({ props: { title: 'Hello', body: 'World' } })"
            >Show</BButton
          >
        </p>
      </BCard>
      <BCard title="Icons">
        <p>
          Using unplugin icons
          <a
            href="https://icon-sets.iconify.design/bi/?keyword=bootstr"
            target="_blank"
            >Bootstrap Icons</a
          >
          By using the prefix <code>bi</code> and the icon name
          <code>apple</code> the component names are in the format
          <code>I{IconPack}{Icon}</code> like
          <code>"<IBiApple></IBiApple>"</code> is
          <code>&lt;IBiApple&gt;&lt;/IBiApple&gt;</code>
          or <code>&lt;i-bi-apple&gt;&lt;/i-bi-apple&gt;</code>
        </p>
        <IBiApple></IBiApple>
        <i-bi-apple></i-bi-apple>
        <br />
        <a
          href="https://github.com/unplugin/unplugin-icons?tab=readme-ov-file#name-conversion"
          target="_blank"
          >https://github.com/unplugin/unplugin-icons?tab=readme-ov-file#name-conversion</a
        ></BCard
      ></BCardGroup
    >
  </div>
</template>

<script setup lang="ts">
import { BCard, useToastController } from "bootstrap-vue-next";

const { show } = useToastController();
</script>

<style scoped></style>
