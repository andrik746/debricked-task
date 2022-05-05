<script>
import { UploadOutlined } from '@ant-design/icons-vue'
import { uploadFileRequest, checkUploadStatusRequest, concludeUploadRequest } from '@/services/ScannerService'
import handleError from '@/utils/handleError'
import getCssVariableValue from '@/utils/getCssVariableValue'

export default {
  components: {
    UploadOutlined
  },
  data () {
    return {
      fileList: [],
      uploading: false,
      uploadId: ''
    }
  },
  computed: {
    barColor () {
      return getCssVariableValue('--active-color')
    }
  },
  methods: {
    onChange (file) {
      // this method will be triggered every time we add a new file
      // we will support only 1 file for MVP
      this.fileList = [file]

      // we need to retrun false to stop the default behavior of the ui component
      // we will send our custom request instead
      return false
    },
    clearFileList () {
      // since we support only 1 file
      this.fileList = []
    },
    async handleUpload () {
      try {
        await this.uploadFile()
        // we send the 'conclude' request to inform the server that there will be no more files for current upload
        await this.concludeUpload()
      } catch (e) {
        handleError(e)
      }
    },
    async uploadFile () {
      try {
        this.uploading = true
        const response = await uploadFileRequest(this.fileList[0])
        this.uploadId = response.data.ciUploadId
        this.clearFileList()
      } catch (e) {
        handleError(e)
      } finally {
        this.uploading = false
      }
    },
    async concludeUpload () {
      try {
        if (!this.uploadId) throw new Error('Upload ID is missing!')
        await concludeUploadRequest(this.uploadId)
      } catch (e) {
        handleError(e)
      }
    },
    async checkUploadStatus () {
      try {
        await checkUploadStatusRequest(this.uploadId)
      } catch (e) {
        handleError(e)
      }
    },
  }
}
</script>

<template>
  <div class="scanner">
    <h1>Scanner</h1>

    <h3 class="mb-1">Upload your dependency files</h3>
    <a-upload  :file-list="fileList" :before-upload="onChange" @remove="clearFileList">
      <a-button>
        <upload-outlined></upload-outlined>
        Select File
      </a-button>
    </a-upload>

    <div class="mt-1">
      <a-button
        type="primary"
        :disabled="fileList.length === 0"
        :loading="uploading"
        @click="handleUpload"
      >
        {{ uploading ? 'Uploading' : 'Start Upload' }}
      </a-button>

      <a-button class="mt-1" @click="checkUploadStatus">Check status</a-button>
    </div>

    <a-progress :percent="30" :strokeColor="barColor" />
  </div>
</template>

<style scoped>

</style>

<style>
/* we can't use 'scoped' to edit components of the ui library */
.scanner .ant-progress-text {
  color: var(--text-color);
}
</style>