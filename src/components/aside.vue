<template>
  <div class="hello">
    <el-row class="tac">
			<el-col :span="24">
				<el-menu
					default-active="/home/index"
					background-color="rgb(50, 50, 58)"
					text-color="#fff"
					active-text-color="#2DAFCB">
					<el-menu-item index="/home/index">
						<i class="fa fa-dashboard"></i>
						<span class="title">首页</span>
					</el-menu-item>
					<el-submenu index="2">
						<template slot="title">
							<i class="fa fa-list"></i>
							<span class="title">商品</span>
						</template>
							<el-menu-item index="2-1">商品管理</el-menu-item>
							<el-menu-item index="2-2">品类管理</el-menu-item>
					</el-submenu>
					<el-menu-item index="3">
						<i class="fa fa-check-square-o"></i>
						<span class="title">订单管理</span>
					</el-menu-item>
					<el-menu-item index="1">
						<i class="fa fa-user-o"></i>
						<span class="title">用户管理</span>
					</el-menu-item>
				</el-menu>
			</el-col>
    </el-row>
  </div>
</template>

<script>
	export default {
		data() {
			return {
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.title {
		margin-left: 10px;
	}
</style>
