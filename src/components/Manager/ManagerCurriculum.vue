<template>
	<FilterSelect :parent-selectArr="selectArr" :parent-title="title">
		<button class="confirm-btn btn btn-height">匯入</button>
	</FilterSelect>
   <!--table -->
  <div class="content-box tableContainer">
  	<p class="title"><strong>課表資訊</strong></p>  	  	
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
		{
			selected: "fn",
			data: [
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
			]
		},
		{
			selected: "102",
			data: [
	  		{
	  			name: "101",
	  			item: "101"
	  		},
	  		{
	  			name: "102",
	  			item: "102"
	  		}		 		
			]
		},
		{
			selected: "test",
			data: [
	  		{
	  			name: "test",
	  			item: "test"
	  		},
	  		{
	  			name: "andy",
	  			item: "andy"
	  		}			 		
			]	  			
		},	
		{
			selected: "late",
			data: [
	  		{
	  			name: "late",
	  			item: "late"
	  		},
	  		{
	  			name: "absent",
	  			item: "absent"
	  		},	
	  		{
	  			name: "all",
	  			item: "all"
	  		}					  				 		
			]	  			
		},		  		
		{
			selected: "month",
			data: [
	  		{
	  			name: "今日",
	  			item: "today"
	  		},
	  		{
	  			name: "本月",
	  			item: "month"
	  		}				 		
			]	  			
		},		  		  		
	]);	  	 
	const title = ref("課表資訊");
	
	// table
	const tableTitle = ref([
		{field:"date", title:"日期"},
		{field:"grade", title:"班級"},	  		
		{field:"name", title:"姓名"},
		{field:"signin", title:"簽到"},
		{field:"signout", title:"簽退"},
		{field:"ip", title:"IP"},	  		
	])

	const tableData = ref([
    { date: "20220630", grade: "前端班", name: "ryan", signin: "09:00", signout: "17:30", ip: "127.0.0.1"},
		{ date: "20220630", grade: "前端班", name: "ryan", signin: "09:00", signout: "17:30", ip: "127.0.0.1"},
		{ date: "20220630", grade: "前端班", name: "ryan", signin: "09:00", signout: "17:30", ip: "127.0.0.1"},
	])

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
