<template>
  <div id="order" class="clearfix">
    <div class="page-title">订单管理</div>
    <div class="search-box">
      <el-row>
        <el-col :span="4">
          <el-input v-model="orderNo" placeholder="请输入订单号"></el-input>
        </el-col>
        <el-col class="marginL10" :span="2">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table-container">
      <el-table
        :data="orders"
        border
        stripe
        style="width: 100%">
        <el-table-column
          label="订单号"
          prop="orderNo"
          width="180">
        </el-table-column>
        <el-table-column
          label="收件人"
          prop="receiverName"
          >
        </el-table-column>
        <el-table-column
          label="订单状态"
          prop="statusDesc"
          >
        </el-table-column>
        <el-table-column
          label="订单总价"
          >
          <template slot-scope="scope">
            ￥{{scope.row.payment}}
          </template>
        </el-table-column>
        <el-table-column
          label="	创建时间"
          prop="createTime"
          >
        </el-table-column>
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="info"
              @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          </template>
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
  name: 'order',
  data(){
    return {
      orders: [],
      pageSize: 12,
      pageNum: 1,
      total: 0,
      orderNo: '' // 订单号
    }
  },
  created() {
    this.getOrders()
  },
  methods: {
    getOrders() {
      this.$http.get('/api/manage/order/list.do',{
        params: {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
        }
      }).then(response => {
        let res = response.data
        if(res.status ==0) {
          this.total = res.data.total
          this.orders = res.data.list
        }
      })
    },
    // 分页
    changPage(val){
      this.pageNum = val
      this.getOrders()
    },
    search() {
      this.$http.get('/api/manage/order/search.do',{
        params: {
          orderNo: this.orderNo
        }
      }).then(response => {
        let res = response.data
        if(res.status ==0) {
          this.total = res.data.total
          this.orders = res.data.list
        } else {
          this.$message.error(res.msg)
        }
      })
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
