<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发布文章</span>
        <el-form label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
            <!-- bidirectional data binding (双向数据绑定) -->
            <quill-editor v-model="article.content" ref="myQuillEditor" :options="editorOption"></quill-editor>
          </el-form-item>
          <el-form-item label="频道">
            <!-- <el-select placeholder="请选择频道" v-model="article.channel_id">
              <el-option label="所有频道" :value="null"></el-option>
              <el-option
                :label="channel.name"
                :value="channel.id"
                v-for="channel in channels"
                :key="channel.id"
              ></el-option>
            </el-select>-->
            <!-- 封装得频道下拉列表 -->
            <channel-select v-model="article.channel_id"></channel-select>
          </el-form-item>
          <!-- <el-form-item label="封面">
    <el-radio-group v-model="form.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="onSubmit(false)">发表</el-button>
            <el-button @click="onSubmit(true)">存入草稿</el-button>
          </el-form-item>
        </el-form>
        <!-- 内容 -->
      </div>
    </el-card>
  </div>
</template>

<script>
// 加载富文本编辑器得样式文件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 加载富文本编辑器得核心组件
import { quillEditor } from 'vue-quill-editor'

import ChannelSelect from '@/components/channel-select'
export default {
  name: 'PublishArticle',
  components: {
    quillEditor,
    ChannelSelect
  },
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型
          images: [] // 图片
        }, // 文章
        channel_id: ''
      },
      // channels: [],
      editorOption: {}
    }
  },
  created () {
    console.log('publish created')
    // this.loadChannels()
    if (this.$route.params.articleId) {
      this.loadArticle()
    }
  },
  methods: {
    loadArticle () {
      this.$axios({
        method: 'GET',
        url: `/articles/${this.$route.params.articleId}`
      }).then(res => {
        this.article = res.data.data
      })
    },
    onSubmit (draft) {
      if (this.$route.params.articleId) {
        this.updateArticle(draft)
      } else {
        this.addArticle(draft)
      }
    },
    addArticle (draft) {
      this.$axios({
        methods: '/POST',
        url: '/articles',
        // headers参数
        // headers: {
        //   Authorization: `Bearer${window.localStorage.getItem('user.token')}`
        // },
        // Query参数
        params: {
          draft
        },
        // body参数
        data: this.article
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err, '保存失败')
        })
    },
    updateArticle (draft) {
      this.$axios({
        method: 'PUT',
        url: `/articles/${this.$route.params.articleId}`,
        params: {
          draft
        },
        data: this.article
      })
        .then(res => {
          this.$message({
            type: 'success',
            message: '更新成功'
          })
        }).catch(() => {
          this.$message.error('更新失败')
        })
    }
    // loadChannels () {
    //   this.$axios({
    //     method: 'GET',
    //     url: '/channels'
    //   })
    //     .then(res => {
    //       this.channels = res.data.data.channels
    //     })
    //     .catch(err => {
    //       console.log(err, '获取数据失败')
    //     })
    // }
  }
}
</script>
<style lang="less" scoped>
</style>
