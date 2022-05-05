<script>
import { UploadOutlined } from '@ant-design/icons-vue'
import { uploadFileRequest, checkUploadStatusRequest, concludeUploadRequest } from '@/services/ScannerService'
import handleError from '@/utils/handleError'

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
        const response = await uploadFileRequest(this.fileList)
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
  <h1>Scanner</h1>

  <div class="scanner--label"><label>Upload one or more dependency files</label></div>
  <a-upload :file-list="fileList" :before-upload="beforeUpload" @remove="handleRemove">

    <a-button>
      <upload-outlined></upload-outlined>
      Select Files
    </a-button>
    
  </a-upload>

  <div style="margin-top: 1rem;">
    <a-button
      type="primary"
      :disabled="fileList.length === 0"
      :loading="uploading"
      @click="handleUpload"
    >
      {{ uploading ? 'Uploading' : 'Start Upload' }}
    </a-button>

    <a-button style="margin-left: 1rem" @click="concludeUpload">Conclude</a-button>
    <a-button style="margin-left: 1rem" @click="checkUploadStatus">Check status</a-button>
  </div>

  <a-progress :percent="30" />

  <a-result
    status="success"
    title="Successfully Purchased Cloud Server ECS!"
    sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
  >
    <template #extra>
      <a-button key="console" type="primary">Go Console</a-button>
      <a-button key="buy">Buy Again</a-button>
    </template>
  </a-result>
</template>

<style>
.scanner--label {
  margin-bottom: 0.5rem;
}
</style>