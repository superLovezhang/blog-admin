<template>
  <div class="table-container">
    <SearchBar
      :search-items="searchItems"
      @updateParams="updateParams"
    />
    <slot />
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="page"
      @current-change="nextPage"
    />
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar'

export default {
  name: 'Table',
  components: {
    SearchBar
  },
  props: {
    'searchItems': {
      type: Array,
      required: true
    },
    'pagination': {
      type: Object,
      required: true
    }
  },
  computed: {
    page() {
      return this.pagination?.pages ?? 1
    }
  },
  methods: {
    nextPage(page) {
      this.$emit('nextPage', page)
    },
    updateParams(params) {
      this.$emit('updateParams', params)
    }
  }
}
</script>
