<template>
  <div id="user" class="clearfix">
    <div class="page-title">用户管理</div>
    <div class="table-container">
      <el-table
        :data="users"
        border
        stripe
        v-loading="loading"
        style="width: 100%">
        <el-table-column
          label="ID"
          prop="id"
          width="180">
        </el-table-column>
        <el-table-column
          label="用户名"
          prop="username"
          >
        </el-table-column>
        <el-table-column
          label="邮箱"
          prop="email"
          >
        </el-table-column>
        <el-table-column
          label="电话"
          prop="phone"
          >
        </el-table-column>
        <el-table-column
          label="注册时间"
          prop="createTime"
          >
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      v-if="total>pageSize"
      class="pagination"
      background
      layout="prev, pager, next"
      @current-change="changPage"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      users: [],
      pageNum: 1,
      pageSize: 12,
      loading: false,
      total: 0
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      this.loading = true
      this.$http.get('/api/manage/user/list.do',{
        params: {
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }
      }).then(response => {
        let res = response.data
        res.data.list.forEach(item => {
          item.createTime = new Date(item.createTime).toLocaleString()
        })
        if(res.status == 0) {
          this.total = res.data.total
          this.loading = false
          this.users = res.data.list
        }
      })
    },
    /**
     * 分页
     */
    changPage(val){
      this.pageNum = val
      this.getUsers()
    },
  }
}
</script>

<style>
 #app {
   margin: 0;
   padding: 0;
   height: 100%;
   width: 100%;
   overflow: hidden;
 }
</style>
