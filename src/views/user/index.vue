<template>
  <div class="user_container">
    <Table
      :search-items="searchItems"
      :pagination="$store.state.user.pagination"
      @updateParams="updateParams"
      @nextPage="nextPage"
    >
      <el-table
        :data="$store.getters.userList"
        border
        style="width: 100%">
        <el-table-column
          prop="avatar"
          label="头像"
          align="center"
          width="75"
        >
          <template slot-scope="scope">
            <img :src="scope.row.avatar" alt="" style="width: 40px; height: 40px">
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
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
            {{ (scope.row.gender === -1) ? '未知' : scope.row.gender === 0 ? '男' : '女' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          width="75"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 'FROZEN' ? 'danger' : 'success'">
              {{ scope.row.status === 'FROZEN' ? '冻结' : '正常' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="frozenReason"
          label="冻结原因"
          align="center"
        />
        <el-table-column
          prop="createTime"
          label="注册日期"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          header-align="center"
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
              :type="hasFrozen(scope.row.status) ? 'success' : 'danger'"
              @click="hasFrozen(scope.row.status) ? thawUser(scope.row): openDialog(scope.row)"
            >
              {{ hasFrozen(scope.row.status) ? '解冻' : '冻结' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="冻结"
        :visible.sync="frozenUserDialog"
        width="30%"
        :before-close="closeDialog"
      >
        <el-input
          v-model="frozenReason"
          placeholder="请输入冻结理由"
        />
        <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="frozenUser">确 定</el-button>
      </span>
      </el-dialog>
    </Table>
  </div>
</template>

<script>
import Table from '@/components/Table'

export default {
  components: {
    Table
  },
  data() {
    return {
      currentUser: {},
      frozenUserDialog: false,
      frozenReason: '',
      searchItems: [
        {
          type: 'select',
          paramName: 'gender',
          placeholder: '请选择性别',
          children: [
            {
              label: '男',
              value: 0
            },
            {
              label: '女',
              value: 1
            }
          ]
        },
        {
          type: 'select',
          paramName: 'status',
          placeholder: '请选择状态',
          children: [
            {
              label: '冻结',
              value: 'FROZEN'
            },
            {
              label: '正常',
              value: 'NORMAL'
            }
          ]
        },
        {
          type: 'input',
          paramName: 'searchValue',
          placeholder: '请输入搜索内容'
        }
      ]
    }
  },
  mounted() {
    this.$store.dispatch('user/getUserList')
  },
  methods: {
    updateParams(params) {
      this.$store.dispatch('user/updateUserListParams', params)
    },
    nextPage(page) {
      this.$store.dispatch('user/updatePagination', { page })
    },
    hasFrozen(status) {
      return status === 'FROZEN'
    },
    openDialog(user) {
      this.currentUser = user
      this.frozenUserDialog = true
    },
    closeDialog() {
      this.frozenUserDialog = false
      this.frozenReason = ''
    },
    frozenUser() {
      if (!this.frozenReason) {
        return this.$message.error('冻结理由不能为空')
      }
      this.$store.dispatch('user/banUser', {
        userId: this.currentUser.userId,
        status: 'FROZEN',
        frozenReason: this.frozenReason
      })
      this.closeDialog()
    },
    thawUser(user) {
      this.$store.dispatch('user/banUser', { userId: user.userId, frozenReason: '' })
      this.$message.success('操作成功')
    }
  }
}
</script>

<style scoped lang="scss">
.user_container {
  padding: 30px;
}
</style>
