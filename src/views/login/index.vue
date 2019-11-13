<template>
  <div class="login">
    <el-card class="login-card">
      <!-- 卡片内容 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单 -->
      <el-form :model="loginForm" :rules="loginRules" ref="formobj" style="margin-top:30px">
        <!-- 一个表单就是一个from -->
        <el-form-item prop="mobile">
          <!-- 放置表单组件 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入您得手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input style="width:305px" v-model="loginForm.code" placeholder="请输入验证码"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="loginForm.checked" style="float:left">我已阅读并同意用户协议及条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div ref="abc"></div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      // 要校验得整个表单数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false
      },
      //   表单得验证规则
      loginRules: {
        // key(要校验得字段名).value(数组=>多条或者1条或者没有规则)
        mobile:
     [ { required: true, message: '请输入您得手机号' },
       { pattern: /^1[34578]\d{9}$/, message: '请输入正确得手机号' }
     ],
        code: [{ required: true, massage: '请输入验证码' }, {
          pattern: /^\d{6}$/, massage: '请输入六位数字'
        }],
        checked: [{
        // rule代表当前得规则
        // value代表当前得值
        // callback
          validator: function (rule, value, callback) {
            if (value) {
              callback()
            } else {
              callback(new Error('请您阅读协议'))
            }
          }
        }]
      }
    }
  },
  methods: {
    login () {
    //   console.log(this.$ref.abc)
    //   this.$refs.formobj 获取el-form得对象实例
      this.$refs.formobj.validate((isok) => {
        if (isok) {
          //   如果为turn则去服务器核对调用接口登录
          this.$axios({
            url: '/authorizations',
            data: this.loginForm,
            method: 'POST'
          }).then(result => {
            window.localStorage.setItem('user.token', result.data.data.token)
            //  跳转到主页
            this.$router.push('./home')
          }).catch(() => {
            // 提示消息
            this.$message({
              type: 'warning',
              message: '手机号或者验证码错误'
            })
          })
        }
      })
    }
  }

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
