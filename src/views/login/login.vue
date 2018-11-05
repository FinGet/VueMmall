<template>
  <div id="login">
    <div class="login-box">
      <el-input
        placeholder="请输入用户名"
        v-model="username">
      </el-input>
      <el-input
        placeholder="请输入密码"
        type='password'
        v-model="password">
      </el-input>
      <el-button style="width:100%" type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      let data = {
        username: this.username,
        password: this.password
      }
      this.$http.post('/api/manage/user/login.do',qs.stringify(data),
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
      ).then(response => {
        let res = response.data
        if (res.status == 0) {
          this.$router.push({path:'/home/index'})
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  #login {
    .login-box {
      padding-top: 200px;
      width: 300px;
      margin: 0 auto;
      height: 180px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
</style>
