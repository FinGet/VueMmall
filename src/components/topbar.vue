<template>
  <div id="top-bar" class="clearfix">
    <el-dropdown @command="handleCommand" class="dropdown">
      <span class="el-dropdown-link">
        <i class="fa fa-user"></i>
        欢迎，admin
        <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="/">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    handleCommand(command) {
      this.$message({
        message:'退出登录！',
        type: 'success'
      });
      this.$router.push({path:'/'})
    }
  }
}
</script>

<style lang="scss">
 #top-bar{
   float: right;
   margin-right: 30px;
   .dropdown{
     cursor: pointer;
     .el-dropdown-link{
       font-size: 16px;
     }
   }
 }
</style>
