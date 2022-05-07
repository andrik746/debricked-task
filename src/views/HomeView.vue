<script setup>
import ScannerUploader from "@/components/scanner/ScannerUploader.vue";
import ScannerProgress from "@/components/scanner/ScannerProgress.vue";
import ScannerResult from "@/components/scanner/ScannerResult.vue";
</script>

<script>
export default {
  props: {
    results: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showUploader: true,
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
  },
};
</script>

<template>
  <main>
    <h1>Scanner</h1>

    <!-- we use v-show to keep components alive -->
    <ScannerUploader v-show="showUploader" />
    <ScannerProgress v-show="!showUploader" @show-uploader="toggleUploader" />

    <ScannerResult :results="results" />
  </main>
</template>
