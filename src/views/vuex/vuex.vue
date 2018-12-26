<template>
  <div id="vuex" class="clearfix">
    <h1>VUEX</h1>
    <br/>
    <el-row>
    	<el-col :span="6">
    		<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span>state简单使用</span>
				  </div>
				  <div>
				  	<h2 class="title">state (通过$store.state.xxx 可以 直接 获取 state )</h2>
				  	<p class="marginT10">'$store.state.count': {{$store.state.count}}</p>
				  	<p class="marginT10">'$store.state.age': {{$store.state.age}}</p>
				  	<p class="marginT10">'$store.state.userName': {{$store.state.userName}}</p>
				  	<p class="marginT10">'$store.state.sex': {{$store.state.sex}}</p>
				  </div>
				</el-card>
    	</el-col>
    	<el-col :span="6">
    		<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span>state通过计算属性使用</span>
				  </div>
				  <div>
				  	<h2 class="title">state(在计算属性中 可以通过 this.$store.state获取直接返回，也可以使用mapState辅助函数)</h2>
				  	<p class="marginT10">'count': {{count}}</p>
				  	<p class="marginT10">'age': {{age}}</p>
				  	<p class="marginT10">'userName': {{userName}}</p>
				  	<p class="marginT10">'sex': {{sex}}</p>
				  </div>
				</el-card>
    	</el-col>
    	<el-col :span="6">
    		<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span>getter 简单使用</span>
				  </div>
				  <div>
				  	<h2 class="title">getter (通过$store.getters.xxx 可以 直接 获取 getter )</h2>
				  	<p class="marginT10">'$store.getters.count': {{$store.getters.count}}</p>
				  	<p class="marginT10">'$store.getters.age': {{$store.getters.age}}</p>
				  	<p class="marginT10">'$store.getters.userName': {{$store.getters.userName}}</p>
				  	<p class="marginT10">'$store.getters.sex': {{$store.getters.sex}}</p>
				  	<p class="marginT10 gray">Getter 也可以接受其他 getter 作为第二个参数</p>
				  	<p class="marginT10">'$store.getters.nameLen': {{$store.getters.nameLen}}</p>
				  </div>
				</el-card>
    	</el-col>
    	<el-col :span="6">
    		<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span>getter 通过计算属性使用</span>
				  </div>
				  <div>
				  	<h2 class="title">getter(在计算属性中可以通过 this.$store.getters获取直接返回，也可以使用mapGetters辅助函数)</h2>
				  	<p class="marginT10">'get_count': {{get_count}}</p>
				  	<p class="marginT10">'get_age': {{get_age}}</p>
				  	<p class="marginT10">'get_name': {{get_name}}</p>
				  	<p class="marginT10">'get_sex': {{get_sex}}</p>
				  	<p class="marginT10">'nameLen': {{nameLen}}</p>
				  </div>
				</el-card>
    	</el-col>
    </el-row>
    <el-row>
    	<el-col :span="6">
    		<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span>mutations</span>
				  </div>
				  <div>
				  	<h2 class="title">计数器</h2>
				  	<el-button @click="minus">-</el-button>
			    	<p>count: {{count}}</p>
			    	<el-button @click="add">+</el-button>
				  </div>
				</el-card>
    	</el-col>
    	<el-col :span="6">
    		<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span>mutations 提交载荷(传参)</span>
				  </div>
				  <div>
				  	<h2 class="title">改变userName</h2>
				  	<p class="marginT10">{{userName}}</p>
				  	<el-button @click="chageName">改变</el-button>
				  </div>
				</el-card>
    	</el-col>
    	<el-col :span="6">
    		<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span>mutations mapMutations提交载荷(传参)</span>
				  </div>
				  <div>
				  	<h2 class="title">改变sex</h2>
				  	<p class="marginT10">{{sex}}</p>
				  	<el-button @click="changeSex">改变</el-button>
				  </div>
				</el-card>
    	</el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
export default {
  name: 'Vuex',
  computed: {
  	// 简单的计算属性 返回 state
  	count() {
  		return this.$store.state.count
  	},
  	// mapState 
  	...mapState({
  		age: state => state.age,
  		userName: state => state.userName,
  	}),
  	// 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
  	...mapState(['sex']),

  	// mapGetters 简单使用
  	...mapGetters([
  		'nameLen'
  	]),
  	// 映射新的名字
  	...mapGetters({
  		get_count: 'count',
  		get_age: 'age',
  		get_name: 'userName',
  		get_sex: 'sex'
  	})
  },
  methods: {
  	minus() {
  		this.$store.commit('MINUS_COUNT')
  	},
  	add() {
  		this.$store.commit('ADD_COUNT')
  	},
  	chageName() {
  		this.$store.commit('CHANGE_NAME','新名字')
  	},
  	// mapMutations
  	...mapMutations(['CHANGE_SEX']),
  	changeSex() {
  		this.CHANGE_SEX(0)
  	}
  }
}
</script>

<style scoped lang='scss'>
 	#vuex{
 		padding: 30px;

 		h1{
 			font-size: 30px;
 		}
 		.title {
 			color: red;
 			font-size: 18px;
 		}
 	}
 	.gray {
 		color: #0600fd;
 	}
</style>
