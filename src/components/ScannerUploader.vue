<script>
import { UploadOutlined } from '@ant-design/icons-vue'
import { uploadFileRequest, concludeUploadRequest } from '@/services/ScannerService'
import handleError from '@/utils/handleError'

export default {
  name: 'ScannerUploader',
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
        this.emitter.emit('uploade-completed', this.uploadId)
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
    }
  }
}
</script>
<template>
  <div class="scanner-uploader">
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
    </div>
  </div>
</template>