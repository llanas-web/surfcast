<script setup lang="ts">
import AppHeader from '@/components/app-header.vue';
import AppHero from '@/components/app-hero.vue';
import AppSurfForecast from '@/components/app-surf-forecast.vue';
import AppSection from '@/components/app-section.vue';
import AppCallToAction from './components/app-call-to-action.vue';
import AppFooter from '@/components/app-footer.vue';
</script>

<template>
  <div class="bg-white overflow-hidden">
    <div class="relative isolate z-10" site-config="[object Object]" client:load="">
      <div class="px-6 py-6 md:px-8 preview-menu-wrapper relative">
        <AppHeader />
      </div>
    </div>
    <div class="[&>*]:mt-12 sm:[&>*]:mt-20 md:[&>*]:mt-24 xl:[&>*]:mt-36 2xl:[&>*]:mt-44">
      <AppHero />
      <AppSurfForecast />
      <AppSection />
      <AppCallToAction />
      <AppFooter />
    </div>
  </div>
</template>
