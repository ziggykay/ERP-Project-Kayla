<template>
	<FilterSelect :parent-selectArr="selectArr" :parent-title="title" @user-selectData="totalData">
		<button class="btn confirm-btn">匯入</button>
	</FilterSelect>
   <!--table -->
  <div class="content-box tableContainer">
  	<p class="title"><strong>表格</strong></p>  	  	
		<hr/>
	  <vxe-table :data="tableData" class="tableHeight">
	    <vxe-column v-for="(data, index) of tableTitle "  :field="data.field" :title="data.title"></vxe-column>
	  </vxe-table>
  </div> 

</template>
<script setup>
	import FilterSelect from "../baseComponents/FilterSelect.vue";
	import	{ref} from "vue"
	
	// data
	// selectOption
	const selectArr = ref([
		[
			{
				name: "前端班",
				item: "fn"
			},
			{
				name: "數據班",
				item: "bd"
			},
			{
				name: "雲端班",
				item: "cd"
			}	  		
		],
		[
			{
				name: "101",
				item: "101"
			},
			{
				name: "102",
				item: "102"
			}		 		
		],
		[
			{
				name: "test",
				item: "test"
			},
			{
				name: "andy",
				item: "andy"
			}			 		
		],	
		[
			{
				name: "病假",
				item: "sick"
			},
			{
				name: "事假",
				item: "personal"
			},	
			{
				name: "喪假",
				item: "bereavement"
			},			  				 		
			{
				name: "特殊原因",
				item: "special"
			},			  				 		
		],		  		
		[
			{
				name: "今日",
				item: "today"
			},
			{
				name: "本月",
				item: "month"
			}				 		
		]			  		  		
	]);	  	 
	const title = ref("學員請假資訊");
	
	// table
	const tableTitle = ref([
		{field:"name", title:"姓名"},
		{field:"date", title:"日期"},
		{field:"grade", title:"班級"},
		{field:"reason", title:"請假原因"},
		{field:"note", title:"說明事由"},  		
	])

	const tableData = ref([
    { date: "20220630", grade: "前端班", name: "ryan", reason: "09:00", note: ""},
	])


	const choseSelect = ref()	
	const totalData = (val)=>{
		console.log(val)
		choseSelect.value = {}
		choseSelect.value = {
		}
	}

</script>

<style lang="scss" scoped>
	.tableContainer{
	  width: auto;
	  height: 100vh;
	  .tableHeight{
	  	// height: 80%
	  }
	}		
</style>
