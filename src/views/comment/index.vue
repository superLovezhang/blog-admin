<template>
  <div class="user_container">
    <Table
      :search-items="searchItems"
      :pagination="$store.state.comment.pagination"
      @updateParams="updateParams"
      @nextPage="nextPage"
    >
      <el-table
        :data="$store.getters.commentList"
        border
        style="width: 100%">
        <el-table-column
          prop="user.avatar"
          label="头像"
          align="center"
          width="75"
        >
          <template slot-scope="scope">
            <img :src="scope.row.user.avatar" alt="" style="width: 40px; height: 40px">
          </template>
        </el-table-column>
        <el-table-column
          prop="user.username"
          label="昵称"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width="50"
          align="center"
        >
          <template slot-scope="scope">
            {{ (scope.row.user.gender === -1) ? '未知' : scope.row.user.gender === 0 ? '男' : '女' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="评论内容"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="发布日期"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="openDialog(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <InputDialog
        title="删除"
        placeholder="请输入删除理由"
        :visible="removeCommentDialog"
        @closeDialog="closeDialog"
        @confirmDialog="confirmDialog"
      />
    </Table>
  </div>
</template>

<script>
import Table from '@/components/Table'
import InputDialog from '@/components/InputDialog'

export default {
  components: {
    Table,
    InputDialog
  },
  data() {
    return {
      commentId: null,
      removeCommentDialog: false,
      removeReason: '',
      searchItems: [
        {
          type: 'input',
          paramName: 'searchValue',
          placeholder: '请输入搜索内容'
        }
      ]
    }
  },
  mounted() {
    this.$store.dispatch('comment/getCommentList')
  },
  methods: {
    updateParams(params) {
      this.$store.dispatch('comment/updateQueryParams', params)
    },
    nextPage(page) {
      this.$store.dispatch('comment/updatePagination', { page })
    },
    openDialog(comment) {
      this.commentId = comment.commentId
      this.removeCommentDialog = true
    },
    closeDialog() {
      this.removeCommentDialog = false
    },
    confirmDialog(removeReason) {
      if (!removeReason) {
        return this.$message.error('删除理由不能为空')
      }
      this.$store.dispatch('comment/removeComment', {
        removeReason,
        commentId: this.commentId
      })
      this.closeDialog()
    }
  }
}
</script>

<style scoped lang="scss">
.user_container {
  padding: 30px;
}
</style>
