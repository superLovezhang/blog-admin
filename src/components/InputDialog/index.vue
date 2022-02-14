<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="30%"
    :before-close="closeDialog"
  >
    <el-input
      v-model="inputValue"
      :placeholder="placeholder"
    />
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="confirmDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'InputDialog',
  props: {
    title: {
      type: String
    },
    placeholder: {
      type: String
    },
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
      this.inputValue = null
    },
    confirmDialog() {
      if (!this.inputValue) {
        this.$message.warning(`${this.title}理由不能为空`)
        return
      }
      this.$emit('confirmDialog', this.inputValue)
      this.inputValue = null
    }
  }
}
</script>
