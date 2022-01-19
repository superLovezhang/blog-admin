<template>
  <div class="user_container">
    <SearchBar
      :searchItems="searchItems"
      @queryMethod="(params) => $store.dispatch('user/getUserList', params)"
    />
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
        prop="email"
        label="冻结原因"
        align="center"
      >-</el-table-column>
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
            @click="frozenUser(scope.row)"
          >
            {{ hasFrozen(scope.row.status) ? '解冻' : '冻结' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar'

export default {
  components: {
    SearchBar
  },
  data() {
    return {
      searchValue: '',
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
    hasFrozen(status) {
      return status === 'FROZEN'
    },
    frozenUser(user) {
      this.userList[0].status = this.hasFrozen(user.status) ? 'NORMAL' : 'FROZEN'
      console.log(user)
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
