<template>
  <div id="product" class="clearfix">
    <div class="page-top clearfix">
      <div class="page-title left">商品管理</div>
      <el-button type="primary" class="right"><i class="fa fa-plus"></i>添加商品</el-button>
    </div>
    <div class="search-box">
      <el-row>
        <el-col :span="3">
          <el-select v-model="selectvalue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col class="marginL10" :span="4">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col class="marginL10" :span="2">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table-container">
      <el-table
        :data="lists"
        border
        stripe
        style="width: 100%">
        <el-table-column
          label="商品id"
          prop="id"
          width="180">
        </el-table-column>
        <el-table-column
          label="商品信息"
          prop="subtitle"
          width="500">
        </el-table-column>
        <el-table-column
          label="商品价格"
          prop="price"
          >
        </el-table-column>
        <el-table-column
          label="状态"
          width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="text">{{scope.row.status==1?'在售':'已下架'}}</el-button>
            <el-button size="mini" type="warning" @click="onSetProductStatus(scope.row.id,scope.row.status)">{{scope.row.status==1?'下架':'上架'}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <el-input v-model="form.subtitle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属品类" :label-width="formLabelWidth">
          <el-select v-model="form.categoryId" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input placeholder="请输入内容" v-model="form.price">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品库存" :label-width="formLabelWidth">
          <el-input placeholder="请输入内容" v-model="form.stock">
            <template slot="append">件</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品图片" :label-width="formLabelWidth">
          <img v-for="item in form.subImages" :src="item" alt="" :key="item">
        </el-form-item>
        <el-form-item label="商品详情" :label-width="formLabelWidth">
          <p v-html="form.detail"></p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'product',
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      lists: [],
      options: [{
          value: 'productId',
          label: '按商品id查询'
        }, {
          value: 'productName',
          label: '按商品名称查询'
      }],
      selectvalue: 'productId',
      input: '', // 输入框内容
      dialogTitle: '', // 弹窗标题
      dialogVisible: false,
      formLabelWidth: '80px',
      form: {
        name: '',
        subtitle: '',
        categoryId: '',
        price: '',
        stock: '',
        subImages: [],
        detail: ''
      }
    }
  },
  created() {
    this.getProductsLists()
  },
  methods: {
    /**
     * 获取产品列表
     */
    getProductsLists() {
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      this.$http.get('/api/manage/product/list.do',{
          params: data
        }).then(response => {
        let res = response.data
        if(res.status ==0) {
          this.total = res.data.total
          this.lists = res.data.list
        }
      })
    },
    getProductDetail(id){
      let _this = this
      this.$http.get('/api/manage/product/detail.do',{
        params: {
          productId: id
        }
      }).then(response => {
        let res = response.data
        if(res.status == 0) {
          let images = res.data.subImages.split(',');
          res.subImages = images.map((imgUri) => {
            return {
              uri: imgUri,
              url: res.data.imageHost + imgUri
            }
          });
          // debugger
          for (let key in _this.form) {
            if (_this.form.hasOwnProperty(key) === true) {
              _this.form[key] = res.data[key]
            }
          }
        }
      })
    },
    /**
     * 查看详情
     */
    handleDetail(index,data) {
      this.dialogVisible = true
      this.getProductDetail(data.id)
    },
    /** 
     * 编辑 
     */    
    handleEdit(index,data) {

    },
    /**
     * 上下架
     */
    onSetProductStatus(id,status) {
      console.log(id)
      let str = status==1?'下架':'上架'
      let data = {
        productId: id,
        status: status ==1 ? 2 : 1
      }
      this.$confirm(`确认${str}此商品?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get('/api/manage/product/set_sale_status.do',
          {params:data} 
        ).then(response => {
          let res = response.data
          if (res.status == 0) {
            this.getProductsLists()
            this.$message({
              type: 'success',
              message: res.data
            });
          } else {
            this.$message({
              type: 'success',
              message: res.data
            });
          }
        })
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },
    /**
     * 搜索
     */
    search() {
      let _this = this
      let data = {
        pageNum: 1,
        [_this.selectvalue]: this.input
      }
      this.$http.get('/api//manage/product/search.do',
        {params: data}
      ).then(response => {
        let res = response.data
        if(res.status ==0) {
          this.total = res.data.total
          this.lists = res.data.list
        }
      })
    },
    /**
     * 分页
     */
    changPage(val){
      this.pageNum = val
      this.getProductsLists()
    }
  }
}
</script>

<style scoped lang='scss'>
 #product {
   margin: 0;
   padding: 0;
   height: 100%;
   width: 100%;
   overflow: hidden;
 }
 .table-container{
   height: 570px;
   overflow: auto;
 }
</style>
