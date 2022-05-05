<script setup>
import ScannerUploader from '@/components/ScannerUploader.vue'
import ScannerProgress from '@/components/ScannerProgress.vue'
</script>

<script>
export default {
  data () {
    return {
      showUploader: true
    }
  },
  mounted () {
    this.emitter.on("uploade-completed", this.toggleUploader)
  },
  beforeUnmount () {
    this.emitter.off("uploade-completed", this.toggleUploader)
  },
  methods: {
    toggleUploader () {
      this.showUploader = !this.showUploader
    }
  }
}
</script>

<template>
  <main>
    <h1>Scanner</h1>
    

    <ScannerUploader v-show="showUploader" />
    <ScannerProgress v-show="!showUploader" />
  </main>
</template>
