<script>
export default {
  name: "ScannerResult",
  props: {
    results: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data() {
    return {
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Date of Processing",
          dataIndex: "date",
          key: "date",
        },
        {
          title: "Vulnerabilities",
          dataIndex: "vulnerabilities",
          key: "vulnerabilities",
        },
      ],
    };
  },
  computed: {
    dataSource() {
      return Array.from(this.results).reverse();
    },
  },
};
</script>

<template>
  <div class="scanner-results mt-1">
    <a-table
      v-if="results.length"
      :dataSource="dataSource"
      :columns="columns"
      :pagination="false"
    />
  </div>
</template>

<style>
.scanner-results .ant-table {
  background: var(--background-lighter);
}
.scanner-results .ant-table-thead > tr > th {
  background: var(--background-darker);
  color: var(--text-color);
}
</style>
