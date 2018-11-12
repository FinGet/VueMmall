<template>
  <div id="product" class="clearfix">
    <div class="page-top clearfix">
      <div class="page-title left">商品管理</div>
      <el-button type="primary" @click="handleAdd" class="right"><i class="fa fa-plus"></i>添加商品</el-button>
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
          label="商品名称"
          prop="name"
          >
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" @close="closeDialog">
      <el-form :model="form" :rules="rules"  :label-width="formLabelWidth" ref="ruleForm">
        <el-form-item label="商品名称" prop="name">
          <el-input class="input300" :disabled="disable" v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="subtitle">
          <el-input class="input300" :disabled="disable" v-model="form.subtitle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属品类" prop="parentCategoryId">
          <el-select v-model="form.parentCategoryId" :disabled="disable" placeholder="请选择一级分类" @change="chooseFirstCategory">
            <el-option v-for="item in firstCategory" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="form.categoryId" v-if="form.parentCategoryId" :disabled="disable" placeholder="请选择二级分类">
            <el-option v-for="item in secondCategory" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input class="input300" :disabled="disable" placeholder="请输入内容" v-model="form.price">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="stock">
          <el-input class="input300" :disabled="disable" placeholder="请输入内容" v-model="form.stock">
            <template slot="append">件</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="subImages">
          <img class="img" v-for="item in form.subImages" :src="item.url" v-if="item.uri" alt="" :key="item.uri">
          <form enctype="multipart/form-data" ref="imgForm" v-if="!disable">
            <input type="file" @change="chooseImg($event)" name="upload_file" value="imgFile" accept="image/png,image/gif,image/jpeg">
            <button type="submit" @click.prevent.stop="uploadImg">上传</button>
          </form>
        </el-form-item>
        <el-form-item label="商品详情" prop="detail">
          <p v-html="form.detail" class="detail" v-if="disable"></p>
          <quill-editor v-else
              v-model="form.detail"
              :options="editorOption"
              >
          </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" v-if="!disable" @click="submitForm">确 定</el-button>
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
      lists: [], // 表格数据
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
      dialogVisible: false, // 弹窗显示/隐藏
      formLabelWidth: '100px',
      firstCategory: [], // 一级分类
      secondCategory: [], // 二级分类
      form: { // 表单数据
        name: '',
        subtitle: '',
        parentCategoryId: '',
        categoryId: '',
        price: '',
        stock: '',
        subImages: [],
        detail: ''
      },
      type: '', // 操作类型
      editorOption: { // 富文本配置
        modules: {
          toolbar:[
            ['bold', 'italic', 'underline', 'strike'],
            [{'font':[]}],        // toggled buttons
            [{ 'header': 1 }, { 'header': 2 }],
              ['header','blockquote', 'code-block'],
              ['image']
          ]
        }
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        subtitle: [
          { required: true, message: '请输入商品信息', trigger: 'blur' }
        ],
        parentCategoryId: [
          {required: true, message: '请选择商品所属品类', trigger: 'blur' }
        ],
        price: [
          { type: 'number', required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        stock: [
          { type: 'number', required: true, message: '请输入商品库存', trigger: 'blur' }
        ],
        subImages: [
          { required: true, message: '请上传商品图片', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '请输入商品详情', trigger: 'blur' }
        ]
      },
      imgFile:{}
    }
  },
  computed: {
    disable() {
      return this.type == 'detail'
    }
  },
  created() {
    this.getProductsLists()
    // 加载一级分类
    this.getCategory() 
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
    /**
     * 查看详情
     */
    getProductDetail(id){
      let _this = this
      this.$http.get('/api/manage/product/detail.do',{
        params: {
          productId: id
        }
      }).then(response => {
        let res = response.data
        if(res.status == 0) {
          let images = res.data.subImages&&res.data.subImages.split(',');
          res.data.subImages = images&&images.map((imgUri) => {
            return {
              uri: imgUri,
              url: res.data.imageHost + imgUri
            }
          });
          // console.log(res.data.subImages)
          // debugger
          for (let key in _this.form) {
            if (_this.form.hasOwnProperty(key) === true) {
              _this.form[key] = res.data[key]

            }
          }
          this.getCategory(this.form.parentCategoryId)
          console.log(this.form)
        }
      })
    },
    /**
     * 查看详情
     */
    handleDetail(index,data) {
      this.dialogVisible = true
      this.type = 'detail'
      this.getProductDetail(data.id)
    },
    /** 
     * 编辑 
     */    
    handleEdit(index,data) {

    },
    /**
     * 添加
     */
    handleAdd() {
      this.type = 'add'
      this.dialogVisible = true
    },
    /**
     * 上下架
     */
    onSetProductStatus(id,status) {
      // console.log(id)
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
    },
    /**
     * 关闭弹窗
     */
    closeDialog() {
      // 手动清空表单数据
      // for (let key in this.form) {
      //   if(this.form.hasOwnProperty(key)) {
      //     this.form[key] = ''
      //   }
      // }
      // 重置表单 && 验证
      this.$refs.ruleForm.resetFields();
      this.type = ''
      // console.log(this.form)
      this.secondCategory = [] // 二级品类 根据 一级品类 而来 所以要清空
    },
    /**
     * 获取品类 一级品类不需要id ，二级品类需要 父级id
     */
    getCategory(id) {
      this.$http.get('/api/manage/category/get_category.do',{
        params: {
          categoryId:  id || 0
        }
      }).then(response => {
        let res = response.data
        if(res.status == 0) {
          if (!id) {
          // 一级分类
          this.firstCategory = res.data
          } else {
          // 二级分类
          this.secondCategory = res.data
          }
        }
        
      })
    },
    /**
     * 选择一级品类 则对应加载二级品类
     */
    chooseFirstCategory(value) {
      // 选择新的一级品类 则二级需要先置空
      this.form.categoryId = ''
      this.secondCategory = []
      this.getCategory(value)
    },
    /**
     * 提交 确认
     */
    submitForm() {
      console.log(this.imgLists)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    /**
     * 图片上传监听
     */
    chooseImg(e) {
      this.imgFile = e.target.value
    },
    uploadImg(){
      let formData  = new FormData(this.$refs.imgForm);
      console.log(this.imgFile)
      if (!this.imgFile) {
        this.$message.error('请选择图片上传!')
        return
      }
      this.$http.post('/api/manage/product/upload.do',formData).then(response => {
        let res= response.data
        if(res.status == 0) {
          this.form.subImages.push(res.data)
        }
      })
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
 .detail image,.img {
   max-width: 100%;
 }
</style>
