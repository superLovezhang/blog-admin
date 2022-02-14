<template>
  <div class="user_container">
    <Table
      :search-items="searchItems"
      :pagination="$store.state.article.pagination"
      @updateParams="updateParams"
      @nextPage="nextPage"
    >
      <el-table
        :data="$store.state.article.articleList"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="articleName"
          label="标题"
          align="center"
        />
        <el-table-column
          prop="content"
          label="内容"
          align="center"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click="reviewArticleContent(row.htmlContent)"
            >查看</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="articleType"
          label="文章类型"
          align="center"
        >
          <template v-slot="{ row }">
            <el-tag effect="dark">{{ row.articleType | typeFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="发布日期"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="90"
          align="center"
        >
          <template slot-scope="{ row }">
            <el-tag :type="row.status | statusColorFilter ">{{ row.status | statusFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="refuseReason"
          label="驳回理由"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="200"
        >
          <template slot-scope="{ row }">
            <el-button
              size="mini"
              type="success"
              @click="updateArticleStatus('PASS', row.articleId)"
            >通过</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="() => openRefuseArticleDialog(row.articleId)"
            >驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="文章内容"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="closeDialog"
      >
        <div class="custom-html-style" v-html="currentContent" />
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closeDialog">关闭</el-button>
        </span>
      </el-dialog>
    </Table>
    <InputDialog
      title="驳回"
      placeholder="请输入驳回理由"
      :visible="inputDialogVisible"
      @closeDialog="inputDialogVisible = false"
      @confirmDialog="(refuseReason) => updateArticleStatus('REFUSE', articleId, refuseReason)"
    />
  </div>
</template>

<script>
import Table from '@/components/Table'
import InputDialog from '@/components/InputDialog'

const ARTICLE_TYPE = [
  {
    label: '原创',
    value: 'ORIGINAL'
  },
  {
    label: '翻译',
    value: 'REPRINT'
  },
  {
    label: '转载',
    value: 'TRANSLATE'
  }
]
const ARTICLE_STATUS = [
  {
    label: '待审核',
    value: 'REVIEW',
    color: 'primary'
  },
  {
    label: '已通过',
    value: 'PASS',
    color: 'success'
  },
  {
    label: '已驳回',
    value: 'REFUSE',
    color: 'danger'
  }
]

export default {
  components: {
    Table,
    InputDialog
  },
  filters: {
    statusFilter: (status) => (ARTICLE_STATUS.find(item => item.value === status) ?? ARTICLE_STATUS[0]).label,
    statusColorFilter: (status) => (ARTICLE_STATUS.find(item => item.value === status) ?? ARTICLE_STATUS[0]).color,
    typeFilter: (type) => (ARTICLE_TYPE.find(item => item.value === type) ?? ARTICLE_TYPE[0]).label
  },
  data() {
    return {
      searchValue: '',
      currentContent: '',
      articleId: null,
      dialogVisible: false,
      inputDialogVisible: false,
      searchItems: [
        {
          type: 'select',
          paramName: 'articleType',
          placeholder: '请选择类型',
          children: ARTICLE_TYPE
        },
        {
          type: 'select',
          paramName: 'status',
          placeholder: '请选择状态',
          children: ARTICLE_STATUS
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
    this.$store.dispatch('article/getArticleList')
  },
  methods: {
    reviewArticleContent(content) {
      this.currentContent = content
      this.dialogVisible = true
    },
    closeDialog() {
      this.dialogVisible = false
      this.currentContent = ''
    },
    openRefuseArticleDialog(articleId) {
      this.articleId = articleId
      this.inputDialogVisible = true
    },
    updateArticleStatus(status, articleId, refuseReason) {
      this.$store.dispatch('article/auditArticle', { status, articleId, refuseReason })
        .then(message => {
          this.$message.success(message)
          this.articleId = null
          this.inputDialogVisible = false
        })
        .catch(err => this.$message.error(err))
    },
    updateParams(params) {
      this.$store.dispatch('article/updateQueryParams', params)
    },
    nextPage(page) {
      this.$store.dispatch('article/updatePagination', { page })
    }
  }
}
</script>

<style scoped lang="scss">
.user_container {
  padding: 30px;
}
</style>
