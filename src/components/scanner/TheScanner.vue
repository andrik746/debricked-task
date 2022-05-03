<script>
import { UploadOutlined } from '@ant-design/icons-vue'
import axios from '@/axiosConfig.js'

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
      uploading: false
    }
  },
  created () {
    console.log('scanner')
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
    handleUpload () {
      const formData = new FormData()
      
      formData.append('repositoryName', 'unknown')
      formData.append('commitName', 'unknown')

      this.fileList.forEach(file => {
        formData.append('fileData', file)
      })

      this.uploading = true

      axios.post('1.0/open/uploads/dependencies/files', formData).then(r => {
        console.log(r)
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        this.uploading = false
      })

      // request('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
      //   method: 'post',
      //   data: formData,
      // }).then(() => {
      //   fileList.value = [];
      //   uploading.value = false;
      //   message.success('upload successfully.');
      // }).catch(() => {
      //   uploading.value = false;
      //   message.error('upload failed.');
      // });
    }
  }
}
</script>

<template>
  <div>Scanner</div>
  
  <a-upload :file-list="fileList" :before-upload="beforeUpload" @remove="handleRemove">
    <a-button>
      <upload-outlined></upload-outlined>
      Select File
    </a-button>
  </a-upload>
  <a-button
    type="primary"
    :disabled="fileList.length === 0"
    :loading="uploading"
    style="margin-top: 16px"
    @click="handleUpload"
  >
    {{ uploading ? 'Uploading' : 'Start Upload' }}
  </a-button>


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

</style>