<template>
  <div class="login">
    <el-card class="login-card">
      <!-- 卡片内容 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单 -->
      <el-form style="margin-top:30px">
        <!-- 一个表单就是一个from -->
        <el-form-item>
          <!-- 放置表单组件 -->
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width:305px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox>我已阅读并同意用户协议及条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {}
}
</script>
<style lang="less" scoped>
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 460px;
    height: 360px;
    .title {
      text-align: center;
      img {
        height: 40px;
      }
    }
  }
}
</style>
