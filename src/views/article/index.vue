<template>
  <div class="user_container">
    <SearchBar :searchItems="searchItems"/>
    <el-table
      :data="articleList"
      border
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        align="center"
      >
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="reviewArticleContent(scope.row.content)"
          >查看</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="articleType"
        label="文章类型"
        align="center"
      >
        <template>
          <el-tag effect="dark">原创</el-tag>
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
        <template>
          <el-tag type="danger">审核中</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="reason"
        label="驳回理由"
        align="center"
      >-</el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200"
      >
        <el-button
          size="mini"
          type="success"
          @click="deleteArticle"
        >通过</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteArticle"
        >驳回</el-button>
      </el-table-column>
    </el-table>
    <el-dialog
      title="文章内容"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="closeDialog"
    >
      <div class="custom-html-style" v-html="currentContent"></div>
    </el-dialog>
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
      currentContent: '',
      dialogVisible: false,
      articleList: [
        {
          title: '马克思主义哲学',
          content: '<p>8个工程必备的JavaScript代码片段，听过这样起博客标题可以提高阅读量。?</p>\n<h2>1. 获取文件后缀名</h2>\n<p>使用场景：上传文件判断后缀名</p>\n<pre class=\"hljs\"><code><span class=\"hljs-comment\">/**\n * 获取文件后缀名\n * <span class=\"hljs-doctag\">@param</span> {<span class=\"hljs-type\">String</span>} <span class=\"hljs-variable\">filename</span>\n */</span>\n <span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">function</span> <span class=\"hljs-title function_\">getExt</span>(<span class=\"hljs-params\">filename</span>) {\n    <span class=\"hljs-keyword\">if</span> (<span class=\"hljs-keyword\">typeof</span> filename == <span class=\"hljs-string\">&#x27;string&#x27;</span>) {\n        <span class=\"hljs-keyword\">return</span> filename\n            .<span class=\"hljs-title function_\">split</span>(<span class=\"hljs-string\">&#x27;.&#x27;</span>)\n            .<span class=\"hljs-title function_\">pop</span>()\n            .<span class=\"hljs-title function_\">toLowerCase</span>()\n    } <span class=\"hljs-keyword\">else</span> {\n        <span class=\"hljs-keyword\">throw</span> <span class=\"hljs-keyword\">new</span> <span class=\"hljs-title class_\">Error</span>(<span class=\"hljs-string\">&#x27;filename must be a string type&#x27;</span>)\n    }\n}\n</code></pre>\n<p>使用方式</p>\n<pre class=\"hljs\"><code><span class=\"hljs-title function_\">getExt</span>(<span class=\"hljs-string\">&quot;1.mp4&quot;</span>) <span class=\"hljs-comment\">//-&gt;mp4</span>\n</code></pre>\n<h2>2. 复制内容到剪贴板</h2>\n<pre class=\"hljs\"><code><span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">function</span> <span class=\"hljs-title function_\">copyToBoard</span>(<span class=\"hljs-params\">value</span>) {\n    <span class=\"hljs-keyword\">const</span> element = <span class=\"hljs-variable language_\">document</span>.<span class=\"hljs-title function_\">createElement</span>(<span class=\"hljs-string\">&#x27;textarea&#x27;</span>)\n    <span class=\"hljs-variable language_\">document</span>.<span class=\"hljs-property\">body</span>.<span class=\"hljs-title function_\">appendChild</span>(element)\n    element.<span class=\"hljs-property\">value</span> = value\n    element.<span class=\"hljs-title function_\">select</span>()\n    <span class=\"hljs-keyword\">if</span> (<span class=\"hljs-variable language_\">document</span>.<span class=\"hljs-title function_\">execCommand</span>(<span class=\"hljs-string\">&#x27;copy&#x27;</span>)) {\n        <span class=\"hljs-variable language_\">document</span>.<span class=\"hljs-title function_\">execCommand</span>(<span class=\"hljs-string\">&#x27;copy&#x27;</span>)\n        <span class=\"hljs-variable language_\">document</span>.<span class=\"hljs-property\">body</span>.<span class=\"hljs-title function_\">removeChild</span>(element)\n        <span class=\"hljs-keyword\">return</span> <span class=\"hljs-literal\">true</span>\n    }\n    <span class=\"hljs-variable language_\">document</span>.<span class=\"hljs-property\">body</span>.<span class=\"hljs-title function_\">removeChild</span>(element)\n    <span class=\"hljs-keyword\">return</span> <span class=\"hljs-literal\">false</span>\n}\n</code></pre>\n<p>使用方式:</p>\n<pre class=\"hljs\"><code><span class=\"hljs-comment\">//如果复制成功返回true</span>\n<span class=\"hljs-title function_\">copyToBoard</span>(<span class=\"hljs-string\">&#x27;lalallala&#x27;</span>)\n</code></pre>\n',
          createTime: '2021-09-27 14:11:19',
          status: 0 // 0-审核中 1-已通过 2-已驳回
        }
      ],
      searchItems: [
        {
          type: 'select',
          paramName: 'label',
          placeholder: '请选择类型',
          children: [
            {
              label: '原创',
              value: 0
            },
            {
              label: '翻译',
              value: 1
            },
            {
              label: '转载',
              value: 2
            }
          ]
        },
        {
          type: 'select',
          paramName: 'status',
          placeholder: '请选择状态',
          children: [
            {
              label: '待审核',
              value: 0
            },
            {
              label: '已通过',
              value: 1
            },
            {
              label: '已驳回',
              value: 2
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
  methods: {
    reviewArticleContent(content) {
      this.currentContent = content
      this.dialogVisible = true
    },
    closeDialog() {
      this.dialogVisible = false
      this.currentContent = ''
    },
    deleteArticle() {}
  }
}
</script>

<style scoped lang="scss">
.user_container {
  padding: 30px;
}
</style>
