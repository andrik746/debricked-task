<script>
import { checkUploadStatusRequest } from '@/services/ScannerService'
import handleError from '@/utils/handleError'
import getCssVariableValue from '@/utils/getCssVariableValue'

export default {
  name: 'ScannerProgress',
  computed: {
    barColor () {
      return getCssVariableValue('--active-color')
    }
  },
  mounted () {
    this.emitter.on("uploade-completed", this.watchProgress)
  },
  beforeUnmount () {
    this.emitter.off("uploade-completed", this.watchProgress)
  },
  methods: {
    watchProgress (uploadId) {

    },
    async checkUploadStatus (uploadId) {
      try {
        await checkUploadStatusRequest(uploadId)
      } catch (e) {
        handleError(e)
      }
    },
  }
}
</script>

<template>
  <div class="scanner-progress">
    <a-progress :percent="30" :strokeColor="barColor" />
  </div>
</template>

<style>
/* we can't use 'scoped' to edit components of the ui library */
.scanner .ant-progress-text {
  color: var(--text-color);
}
</style>