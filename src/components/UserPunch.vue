<template>
		<div class="mb-1">
	  	<button class="confirm-btn btn me-1">圖表顯示</button>
	  	<button class="confirm-btn btn me-1">表格顯示</button>		
		</div>
	  <!-- 日期選擇套件 Vue3-Datepicker -->
	  <Datepicker class="datepicker w-100 shadow" v-model="date" range/>		
</template>
  
<script type="text/javascript">
	export default {
	  name:'UserPunch',
	  data(){
	    return{
	    	date: ""
	    }
	  },
	  computed:{
	  },	  
	  mounted(){
	  	let vm = this;
	    const startDate = new Date();
	    const endDate = new Date(new Date().setDate(startDate.getDate() + 7))
	    vm.date = [startDate, endDate]		  	
	  },	  
	  methods: {
	  }
	} 
</script>

<style lang="scss" scoped >  
</style>