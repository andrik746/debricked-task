<script>
import { UploadOutlined } from '@ant-design/icons-vue'
import { uploadFilesRequest, checkUploadStatusRequest, concludeUploadRequest } from '@/services/ScannerService'
import handleError from '@/utils/handleError'
import getCssVariableValue from '@/utils/getCssVariableValue'

export default {
  components: {
    UploadOutlined
  },
  data () {
    return {
      fileList: [
        // {
        //   uid: '1',
        //   name: 'xxx.png',
        //   status: 'done',
        //   response: 'Server Error 500',
        //   // custom error message to show
        //   url: 'http://www.baidu.com/xxx.png',
        // }, 
        // {
        //   uid: '2',
        //   name: 'zzz.png',
        //   status: 'error',
        //   response: 'Server Error 500',
        //   // custom error message to show
        //   url: 'http://www.baidu.com/zzz.png',
        // }
      ],
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
    beforeUpload (file) {
      // we need this method to stop the ui component from sending request ???
      this.fileList = [...this.fileList, file]
      return false
    },
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    async handleUpload () {
      try {
        this.uploading = true
        const response = await uploadFilesRequest(this.fileList)
        this.uploadId = response.data.ciUploadId
      } catch (e) {
        handleError(e)
      } finally {
        this.uploading = false
      }
    },
    async concludeUpload () {
      try {
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
    <a-upload  :file-list="fileList" :before-upload="beforeUpload" @remove="handleRemove">
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

      <a-button class="mt-1" @click="concludeUpload">Conclude</a-button>
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