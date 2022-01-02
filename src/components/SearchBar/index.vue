<template>
  <div class="user_search-box">
    <el-select
      v-for="item in selectItems"
      :key="item.paramName"
      slot="prepend"
      v-model="params[item.paramName]"
      :placeholder="item.placeholder"
      class="search_select"
      @change="callQueryMethod"
    >
      <el-option
        v-for="subItem in item.children"
        :key="subItem.value"
        :label="subItem.label"
        :value="subItem.value"
      />
    </el-select>
    <el-input
      v-for="item in inputItems"
      :key="item.paramName"
      v-model="params[item.paramName]"
      :placeholder="item.placeholder"
      class="search_input"
      clearable
      @keyup.enter.native="callQueryMethod"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="callQueryMethod"
      />
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    searchItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      params: {}
    }
  },
  methods: {
    callQueryMethod() {
      // 触发父组件传来的函数
      // this.$emit('xxx', this.params)
      console.log(this.params)
    }
  },
  computed: {
    selectItems() {
      return this.$props.searchItems.filter(item => item.type === 'select')
    },
    inputItems() {
      return this.$props.searchItems.filter(item => item.type === 'input')
    }
  }
}
</script>

<style scoped>
.search_select {
  margin-right: 20px;
}
.search_input {
  width: 500px;
  margin-bottom: 25px;
}
</style>
