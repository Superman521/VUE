<template>
  <!-- 头部组件  -->
  <el-row type="flex" justify="space-between" align="top">
    <!-- 左侧 -->
    <el-col :span="6" class="left">
      <!-- 左侧 -->
      <i class="el-icon-s-fold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>

    <!-- 右侧侧 -->
    <el-col :span="3" class="right">
      <!-- 头像 -->
      <img src="../assets/img/avatar.jpg" alt />
      <!-- 下拉菜单 -->
      <el-dropdown trigger="click">
        <span>水若寒宇</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>账户信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item @click.native="onlogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    onlogout () {
      this.$confirm('确认退出码', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除token
        window.localStorage.removeItem('user.tokenddddddd')
        // 跳转登录页面
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.left {
  display: flex;
  align-items: center;
  i {
    font-size: 24px;
  }
  span {
    margin-left: 4px;
  }
}
.right {
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
    margin-right: 5px;
  }
}
</style>
