<script>
export default {
  name: 'ScannerResult',
  props: {
    results: {
      type: Array,
      default: [],
      required: true
    }
  },
  data () {
    return {
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Date of Processing',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Vulnerabilities',
          dataIndex: 'vulnerabilities',
          key: 'vulnerabilities',
        },
      ],
    }
  }
}
</script>

<template>
  <div class="scanner-results mt-1">
    <a-table v-if="results.length" :dataSource="results.reverse()" :columns="columns" :pagination="false" />
  </div>

</template>