<template>
  <div id="home" class="clearfix">
    <el-container class="container">
      <el-aside width="240px" class="aside">
        <a href="/home/index" class="navbar-brand"><b>HAPPY</b>MMALL</a>
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <TopBar></TopBar>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from '@/components/aside.vue'
import TopBar from '@/components/topbar.vue'
export default {
  name: 'Home',
  components: {
    Aside,
    TopBar
  }
}
</script>

<style lang="scss" scoped>
  #home {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .container{
    height: 100%;
  }
  .aside {
    height: 100%;
    background-color:rgb(50, 50, 58);
    .navbar-brand {
      display: block;
      color: #fff;
      width: 240px;
      font-size: 30px;
      font-weight: 700;
      text-transform: uppercase;
      line-height: 30px;
      background: #32323a;
      padding: 15px 0;
      text-align: center;
      b{
        margin-right: 5px;
        color: #2DAFCB;
      }
    }
  }
  
</style>
