<template>
  <div id="category" class="clearfix">
    <div class="page-top clearfix">
      <div class="page-title left">品类管理</div>
      <el-button type="primary" @click="handleAdd" class="right"><i class="fa fa-plus"></i>添加品类</el-button>
    </div>
    <div class="table-container">
      <el-table
        :data="firstCategory"
        border
        stripe
        v-loading="loading"
        style="width: 100%">
        <el-table-column
          label="品类id"
          prop="id"
          width="180">
        </el-table-column>
        <el-table-column
          label="品类名称"
          prop="name"
          >
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改名称</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleChild(scope.$index, scope.row)">查看子类</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="新增品类"
      :visible.sync="dialogVisible"
      width="30%"
      @close="closeDialog"
      >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属品类" v-if="type!='edit'">
          <el-select v-model="form.parentId" placeholder="根节点">
            <el-option v-for="item in firstCategory" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品类名称">
          <el-input v-model="form.categoryName"></el-input>
        </el-form-item>
         <el-form-item>
          <el-button type="primary" @click="handleSure">确定</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'category',
  data() {
    return {
      loading: false,
      firstCategory: [],
      dialogVisible: false,
      type:'',
      form: {
        parentId: '',
        categoryName: ''
      }
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    /**
     * 获取品类 一级品类不需要id ，二级品类需要 父级id
     */
    getCategory(id) {
      this.loading = true
      this.$http.get('/api/manage/category/get_category.do',{
        params: {
          categoryId:  id || 0
        }
      }).then(response => {
        let res = response.data
        this.loading = false
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
    // 点击新增品类
    handleAdd() {
      this.dialogVisible = true
      this.type = 'add'
    },
    // 修改名称
    handleEdit(index,row) {
      console.log(row)
      this.type = 'edit'
      this.form.categoryName = row.name
      this.form.categoryId = row.id
      this.dialogVisible = true
    },
    handleSure() {
      let url = this.type =='add'? '/api/manage/category/add_category.do':'/api/manage/category/set_category_name.do'
      this.$http.get(url,{
        params: this.form
      }).then(response => {
        let res = response.data 
        // let type = res.status==0?'success':'error'
        if(res.status == 0) {
          this.$message.success(res.data)
        } else {
          this.$message.error(res.data)
        }
        this.dialogVisible = false
        this.getCategory()
      })
    },
    closeDialog() {
      for(let key in this.form) {
        this.form[key] = ''
      }
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
