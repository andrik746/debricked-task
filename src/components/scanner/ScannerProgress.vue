<script>
import { checkUploadStatusRequest } from "@/services/ScannerService";
import handleError from "@/utils/handleError";
import getCssVariableValue from "@/utils/getCssVariableValue";

export default {
  name: "ScannerProgress",
  emits: ["show-uploader"],
  data() {
    return {
      progressPercent: 0,
      loading: false,
    };
  },
  computed: {
    barColor() {
      return getCssVariableValue("--active-color");
    },
    isScanningCompleted() {
      return this.progressPercent === 100;
    },
    status() {
      return this.isScanningCompleted
        ? "Scanning completed"
        : "Scanning in progress...";
    },
  },
  created() {
    this.emitter.on("uploade-completed", this.watchProgress);
  },
  beforeUnmount() {
    this.emitter.off("uploade-completed", this.watchProgress);
  },
  methods: {
    watchProgress({ uploadId, file }) {
      this.checkUploadStatus({ uploadId, file });
    },
    async checkUploadStatus({ uploadId, file }) {
      try {
        this.loading = true;
        const response = await checkUploadStatusRequest(uploadId);
        this.progressPercent = response.data?.progress || 0;

        if (this.progressPercent === 100) {
          // if scanning is done
          this.onStatusCheckingOver();

          this.showResult({ result: response.data, file });
        } else {
          // check again later
          this.timeout = setTimeout(() => {
            this.checkUploadStatus({ uploadId, file });
          }, 1000);
        }
      } catch (e) {
        this.onStatusCheckingOver();
        handleError(e);
      }
    },
    onStatusCheckingOver() {
      clearTimeout(this.timeout);
      this.loading = false;
      setTimeout(() => {
        this.progressPercent = 0;
        this.$emit("show-uploader");
      }, 1500);
    },
    showResult({ result, file }) {
      const resultObject = {
        name: file.name,
        vulnerabilities: result.vulnerabilitiesFound, // todo: why does it show a total of all vulnerabilities among all files?
        date: new Date().toDateString(),
      };
      this.emitter.emit("new-result", resultObject);
    },
  },
};
</script>

<template>
  <div class="scanner-progress" data-testid="scanner-progress">
    <div class="inline-block mb-1/2">
      <a-spin v-if="!isScanningCompleted" class="scanner-progress__loader" />
      <h3 class="inline-block">{{ status }}</h3>
    </div>
    <a-progress :percent="progressPercent" :strokeColor="barColor" />
  </div>
</template>

<style scoped>
.scanner-progress__loader {
  margin-right: 1rem;
}
</style>
<style>
/* we can't use 'scoped' when editing components of the ui library */
.scanner-progress .ant-progress-text {
  color: var(--text-color);
}
</style>
