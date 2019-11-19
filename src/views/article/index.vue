<template>
  <div>
    <!-- 筛选区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="filterForm.status">

            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <!-- <el-select placeholder="请选择频道" v-model="filterForm.channel_id">
            <el-option label="所有频道" :value="null"></el-option>
            <el-option
            :label="channel.name"
             :value="channel.id"
             v-for="channel in channels"
            :key="channel.id"
             >
            </el-option>
          </el-select> -->
            <channel-select  v-model="filterForm.channel_id"></channel-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            v-model=" rangeData"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
           value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadArticles(1)">查询</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选数据 -->

    <!-- 文章列表 -->
    <el-card class="box-card" style="margin-top:20px">
      <div slot="header" class="clearfix">
        <span>共找到{{totalCount}}条符合条件的内容</span>
      </div>
    <!-- 表格 组件  el-table
    data表格得数组 要求是数组
    生命 slot-scope="scope" 然后就可以通过scope.row 获取遍历项 scope.row就相当于我们自己v-for得item -->
      <el-table :data="articles" style="width: 100%">
        <el-table-column
        prop="date"
         label="封面"
         width="180">
         <template slot-scope="scope">
             <img :src="scope.row.cover.images[0]" alt="" width="60">
         </template>
         </el-table-column>
        <el-table-column
        prop="title"
        label="标题"
        width="180">
        </el-table-column>
        <el-table-column
         prop="status"
          label="发布状态">
          <template  slot-scope="scope">
              <!-- <span v-show="scope.row.status===0">草稿</span>
              <span v-show="scope.row.status===1">待审核</span>
              <span v-show="scope.row.status===2">审核通过</span>
              <span v-show="scope.row.status===3">审核失败</span>
              <span v-show="scope.row.status===4">已删除</span> -->
            <el-tag :type="articleStatus[scope.row.status].type">
                  {{articleStatus[scope.row.status].label}}
            </el-tag>
          </template>
          </el-table-column>
        <el-table-column
         prop="pubdate"
         label="发布日期">
         </el-table-column>
        <el-table-column
        prop="address"
        label="操作">
        <el-button type="danger" @click="onDelete(scope.row.id)" >删除</el-button>
        <el-button
         type="primary"
          @click="$router.push('/publish/'+ scope.row.id)"
          >编辑</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
    @current-change="onpageChange"
     style="margin-top:10px;margin-left:220px"
    background
    layout="prev, pager, next"
    :total="totalCount"
    :disabled="loading"
    >
</el-pagination>
  </div>

</template>

<script>
import ChannelSelect from '@/components/channel-select'
export default {
  name: 'home',
  components: {
    ChannelSelect
  },
  data () {
    return {
      // 过滤数据的表单
      filterForm: {
        status: null,
        channel_id: null
        // begin_pibdate: '',
        // end_pubdate: ''
      },
      rangeData: '',
      articles: [], // 文章数据列表
      articleStatus: [
        {
          type: '',
          //   value: 0,
          label: '草稿'
        },
        { type: 'success',
        //   value: 1,
          label: '待审核'
        },
        { type: 'success',
        //   value: 2,
          label: '审核通过'
        },
        { type: 'danger',
        //   value: 3,
          label: '审核失败'
        },
        { type: 'info',
        //   value: 4,
          label: '已删除'
        }
      ],
      totalCount: 0, // 总记录数
      loading: true, // 表格的loading状态
      // channels: [], // 频道列表
      page: 1// 当前页码
    }
  },
  created () {
    console.log('article created')
    // 初始化得时候加载第一页数据
    this.loadArticles(1)
    // 加载频道列表
    // this.loadChannels()
  },
  methods: {
    loadArticles (page = 1) {
      this.loading = true
      // const token = window.localStorage.getItem('user.token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        // headers: {
        // //   添加请求头； 名字：值  ；
        // //  后端要求把token放到请求头中，使用一个名字叫：Authorization;
        // //  注意：token的格式要求：bearer${window.}
        // // 注意 bearer有个  空 格！
        //   Authorization: `Bearer ${token}`
        // },
        // Query 参数使用params传递
        params: {
          page,
          per_page: 10,
          status: this.filterForm.status,
          channel_id: this.filterForm.channel_id,
          begin_pubdate: this.rangeData[0] ? this.rangeData[0] : null,
          end_pubdate: this.rangeData[1] ? this.rangeData[1] : null
        }
      }).then(res => {
        this.articles = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
        .catch(err => {
          console.log(err, '获取数据失败')
        }).finally(() => {
          this.loading = false
        })
    },
    onpageChange (page) {
      // 记录当前最新页面
      this.page = page
      // 请求加载指定页码的文章列表
      this.loadArticles(page)
    },
    // loadChannels () {
    //   this.$axios({
    //     method: 'GET',
    //     url: '/channels'
    //   }).then(res => {
    //     this.channels = res.data.data.channels
    //   }).catch(err => {
    //     console.log(err, '获取数据失败')
    //   })
    // },
    onDelete (articleId) {
      this.$axios({
        method: 'DELETE',
        // 注意:接口路径中的:target是一个路径参数,:target是动态的,列入1,2,3不要写:
        url: `/articles/${articleId}`
        // headers: {
        //   // 接口中说明的 Content-Type application/json 不需要传递  因为axios会自动添加发送
        //   Authorization: `Bearer${window.localStorage.getItem('user.token')}`
        // }

      }).then(res => {
        this.loadArticles(this.page)
      }).catch(err => {
        console.log(err, '删除失败')
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
