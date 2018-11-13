<template>
  <div id="user" class="clearfix">
    <div class="page-top clearfix">
      <div class="page-title left">用户管理</div>
      <el-button type="primary" @click="exportExcel" class="right"><i class="el-icon-download"></i>导出</el-button>
    </div>
    
    <div class="table-container">
      <el-table
        :data="users"
        border
        stripe
        v-loading="loading"
        id="out-table"
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
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
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
    exportExcel(){
       /* generate workbook object from table */
         var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
         /* get binary string as output */
         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
         return wbout
    }
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
