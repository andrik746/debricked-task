<script>
import { checkUploadStatusRequest } from '@/services/ScannerService'
import handleError from '@/utils/handleError'
import getCssVariableValue from '@/utils/getCssVariableValue'

export default {
  name: 'ScannerProgress',
  emits: ['newResult'],
  data () {
    return {
      progressPercent: 0,
      loading: false,
    }
  },
  computed: {
    barColor () {
      return getCssVariableValue('--active-color')
    },
    status () {
      return this.progressPercent === 100 ? 'Scanning completed' : 'Scanning in progress...'
    }
  },
  created () {
    this.emitter.on("uploade-completed", this.watchProgress)
  },
  beforeUnmount () {
    this.emitter.off("uploade-completed", this.watchProgress)
  },
  methods: {
    watchProgress ({uploadId, file}) {
      this.checkUploadStatus({uploadId, file})
    },
    async checkUploadStatus ({uploadId, file}) {
      try {
        this.loading = true
        const response = await checkUploadStatusRequest(uploadId)
        this.progressPercent = response.data?.progress || 0
        
        if (this.progressPercent === 100) {
          // if scanning is done
          this.onStatusCheckingOver()

          this.showResult({ result: response.data, file})
        } else {
          // check again later
          this.timeout = setTimeout (() => {
            this.checkUploadStatus({uploadId, file})
          }, 1000)
        }
      } catch (e) {
        this.onStatusCheckingOver()
        handleError(e)
      }
    },
    onStatusCheckingOver () {
      clearTimeout(this.timeout)
      this.loading = false
    },
    showResult({result, file}) {
      const resultObject = {
        name: file.name,
        vulnerabilities: result.vulnerabilitiesFound,
        date: new Date().toDateString()
      }
      this.$emit('newResult', resultObject)
    }
  }
}
</script>

<template>
  <div class="scanner-progress">
    <h3 class="mb-1">{{status}}</h3>
    <a-progress :percent="progressPercent" :strokeColor="barColor" />
  </div>
</template>

<style>
/* we can't use 'scoped' to edit components of the ui library */
.scanner .ant-progress-text {
  color: var(--text-color);
}
</style>