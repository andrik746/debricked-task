<script setup>
import ScannerUploader from "@/components/ScannerUploader.vue";
import ScannerProgress from "@/components/ScannerProgress.vue";
import ScannerResult from "@/components/ScannerResult.vue";
</script>

<script>
export default {
  data() {
    return {
      showUploader: true,
      results: [],
    };
  },
  mounted() {
    this.emitter.on("uploade-completed", this.toggleUploader);
  },
  beforeUnmount() {
    this.emitter.off("uploade-completed", this.toggleUploader);
  },
  methods: {
    toggleUploader() {
      this.showUploader = !this.showUploader;
    },
    handleNewResult(result) {
      this.results.push(result);
    },
  },
};
</script>

<template>
  <main>
    <h1>Scanner</h1>

    <!-- we use v-show to keep components alive -->
    <ScannerUploader v-show="showUploader" />
    <ScannerProgress
      v-show="!showUploader"
      @newResult="handleNewResult"
      @showUploader="toggleUploader"
    />

    <ScannerResult :results="results" />
  </main>
</template>
