<template>
    <div>
        <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>评论管理</span>
     <el-table
      :data="articles"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>

      <el-table-column
        prop="total_comment_count"
        label="总评论数">
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数">
      </el-table-column>
           <el-table-column
        prop="comment_status"
        label="评论状态"
        width="180">
        <template slot-scope="scope">
          <el-switch
          v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="onStatusChange(scope.row)"
            >
            </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template>
           <el-row>
            <el-button
            type="primary"
            plain>修改</el-button>
            </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>

</el-card>
    </div>
</template>
<script>
export default {
//   name: 'CommentIndex',
  components: {},
  props: {},
  data () {
    return {
      articles: []// 文章列表 评论数据字段
    }
  },
  computed: {},
  watch: {},
  created () {
    this.lodaArticles()
  },
  methods: {
    lodaArticles () {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(res => {
        this.articles = res.data.data.results
      }).catch(err => {
        console.log(err, '获取数据失败')
      })
    },
    onStatusChange (article) {
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: article.id
        },
        data: {
          allow_comment: article.comment_status
        }
      }).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: `${article.comment_status ? '启用' : '关闭'}成功`
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('操作失败')
      })
    }
  }
}
</script>
