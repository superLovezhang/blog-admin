<template>
  <div class="user_search-box">
    <el-select
      v-for="item in selectItems"
      :key="item.paramName"
      slot="prepend"
      v-model="params[item.paramName]"
      :placeholder="item.placeholder"
      class="search_select"
      @change="updateParentParams"
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
      @keyup.enter.native="updateParentParams"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="updateParentParams"
      />
    </el-input>
    <el-button :disabled="resetConditions" type="primary" @click="reset">重置</el-button>
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
  computed: {
    selectItems() {
      return this.$props.searchItems.filter(item => item.type === 'select')
    },
    inputItems() {
      return this.$props.searchItems.filter(item => item.type === 'input')
    },
    resetConditions() {
      return Object.keys(this.params).length === 0
    }
  },
  methods: {
    updateParentParams() {
      this.$emit('updateParams', this.params)
    },
    reset() {
      this.params = {}
      this.updateParentParams()
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
  margin-right: 20px;
  margin-bottom: 25px;
}
</style>
