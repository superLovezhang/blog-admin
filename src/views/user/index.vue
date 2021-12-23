<template>
  <div class="user_container">
    <div class="user_search-box">
      <el-select v-model="value" placeholder="请选择性别" class="search_select">
        <el-option
          label="男"
          value="0">
        </el-option>
        <el-option
          label="女"
          value="1">
        </el-option>
      </el-select>
      <el-select v-model="value" placeholder="请选择状态" class="search_select">
        <el-option
          label="冻结"
          value="0">
        </el-option>
        <el-option
          label="正常"
          value="1">
        </el-option>
      </el-select>
      <el-input
        placeholder="请输入搜索内容"
        v-model="searchValue"
        class="search_input"
        clearable
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table
      :data="userList"
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
export default {
  data() {
    return {
      searchValue: '',
      userList: [
        {
          username: 'superLoveTian',
          avatar: 'https://tyzzblog.oss-cn-beijing.aliyuncs.com/2021/10/21/1634823510837image.png',
          birthday: null,
          city: null,
          status: 'FROZEN',
          createTime: '2021-09-27 14:11:19',
          description: '我是一个阳光开朗的大男孩子！！！！！！健康努力每一天！！！',
          email: '2321885538@qq.com',
          gender: -1,
          updateTime: '2021-09-27 14:11:19',
          userId: '1442371251732303874'
        }
      ]
    }
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
.search_select {
  margin-right: 20px;
}
.search_input {
  width: 500px;
  margin-bottom: 25px;
}
</style>
