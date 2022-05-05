<script setup>
import ScannerUploader from '@/components/ScannerUploader.vue'
import ScannerProgress from '@/components/ScannerProgress.vue'
</script>

<template>
  <main>
    <h1>Scanner</h1>

    <h3 class="mb-1">Upload your dependency files</h3>
    <ScannerUploader />
    <ScannerProgress />
  </main>
</template>
