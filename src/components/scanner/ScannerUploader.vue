<script>
import { UploadOutlined } from "@ant-design/icons-vue";
import {
  uploadFileRequest,
  concludeUploadRequest,
} from "@/services/ScannerService";
import handleError from "@/utils/handleError";

export default {
  name: "ScannerUploader",
  components: {
    UploadOutlined,
  },
  data() {
    return {
      uploading: false,
    };
  },

  methods: {
    addCustomUpload(file) {
      // this method will be triggered every time we select a new file
      // we will support only 1 file per upload for MVP

      // custom request to upload a file
      this.handleUpload(file);

      // we need to retrun false to stop the default behavior of the ui component
      // we have sent our custom request instead
      return false;
    },
    async handleUpload(file) {
      try {
        this.uploading = true;

        const response = await uploadFileRequest(file);
        const uploadId = response.data?.ciUploadId;
        if (!uploadId) throw new Error("uploadId is missing");

        // we send the 'conclude' request to inform the server that there will be no more files for current upload
        await concludeUploadRequest(uploadId);

        // let other components know that the upload is finished
        this.emitter.emit("uploade-completed", { uploadId, file });
      } catch (e) {
        handleError(e);
      } finally {
        this.uploading = false;
      }
    },
  },
};
</script>
<template>
  <div class="scanner-uploader">
    <h3 class="mb-1">Upload your dependency file to scan for vulnerabilities</h3>

    <a-upload :showUploadList="false" :before-upload="addCustomUpload">
      <a-button :disabled="uploading" :loading="uploading">
        <upload-outlined></upload-outlined>
        Select File
      </a-button>
    </a-upload>
  </div>
</template>
