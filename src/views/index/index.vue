<template>
  <div id="index">
    <div class="page-title">
      首页
    </div>
    <el-row :gutter="24">
      <el-col :span="8">
        <div class="color-box brown">
          <p class="count">{{userNum}}</p>
          <p class="desc">
            <i class="fa fa-user-o"></i>
            <span>用户总数</span>
          </p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="color-box green">
          <p class="count">{{proNum}}</p>
          <p class="desc">
            <i class="fa fa-list"></i>
            <span>商品总数</span>
          </p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="color-box blue">
          <p class="count">{{orderNum}}</p>
          <p class="desc">
            <i class="fa fa-check-square-o"></i>
            <span>d订单总数</span>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      userNum: 0,
      proNum: 0,
      orderNum: 0
    }
  },
  created() {
    this.getBaseCount()
  },
  methods: {
    getBaseCount() {
      this.$http.get('/api/manage/statistic/base_count.do').then(response => {
        let res = response.data
        if (res.status == 0) {
          this.userNum = res.data.userCount
          this.proNum = res.data.productCount
          this.orderNum = res.data.orderCount
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .color-box
    {
      display: block;
      cursor: pointer;
      height: 160px;
      padding: 20px 0;
      transition: all .3s;
      text-align: center;
      opacity: .9;
      &:hover
      {
        transform: scale(1.08);
        text-decoration: none;
        opacity: 1;
        color: #555;
      }
      &:focus
      {
        text-decoration: none;
      }
      .count
      {
        font-size: 50px;
        line-height: 80px;
        height: 80px;
      }
      .desc
      {
        font-size: 18px;
        .fa
        {
          margin-right: 5px;
        }
      }
    }
    .green {
      background-color: #5cb85c;
      color: #fff;
    }

    .blue {
      background-color: #4CB1CF;
      color: #fff
    }

    .brown {
      background-color: #f0ad4e;
      color: #fff;
    }
</style>
