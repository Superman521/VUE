<template>
  <div>
    <!-- 筛选区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="filterForm.status">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select placeholder="请选择活动区域" v-model="filterForm.channel_id">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            v-model=" rangeData"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选数据 -->

    <!-- 文章列表 -->
    <el-card class="box-card" style="margin-top:20px">
      <div slot="header" class="clearfix">
        <span>共找到99999条符合条件的内容</span>
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
        <el-button type="danger" size="mini">删除</el-button>
        <el-button type="primary" size="mini">编辑</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      // 过滤数据的表单
      filterForm: {
        status: '',
        channel_id: '',
        begin_pibdate: '',
        end_pubdate: ''
      },
      rangeData: '',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
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
      ]
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles () {
      const token = window.localStorage.getItem('user.token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        headers: {
        //   添加请求头； 名字：值  ；
        //  后端要求把token放到请求头中，使用一个名字叫：Authorization;
        //  注意：token的格式要求：bearer${window.}
        // 注意 bearer有个  空 格！
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        this.articles = res.data.data.results
      })
        .catch(err => {
          console.log(err, '获取数据失败')
        })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
