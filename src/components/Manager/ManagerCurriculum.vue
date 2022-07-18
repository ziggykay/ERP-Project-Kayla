<template>

	<!-- filter -->
	<div class="content-box filter-box">
  	<p class="title"><strong>{{title}}</strong></p> 	  	
		<hr/>
		<div class="d-flex flex-wrap">
	  	<select class="selectInfo me-2" v-for="item of selectArr" v-model="item.selected">
				<option v-for="(innerItem, index) of item.data" :value="innerItem.item">
					{{ innerItem.name }}
				</option>	      	 	
	  	</select>
		</div>  	
		<div class="d-flex mt-2 flex-wrap">
    	<button class="confirm-btn btn btn-height">搜尋</button>
		</div>
	</div>

   <!--table -->
  <div class="content-box tableContainer">
  	<p class="title"><strong>課程清單</strong></p>  	  	
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
			selected: "2022/01",
			data: [
	  		{
	  			name: "2022/01",
	  			item: "2022/01"
	  		},
	  		{
	  			name: "2022/02",
	  			item: "2022/02"
	  		},
	  		{
	  			name: "2022/03",
	  			item: "2022/03"
	  		}				 		
			]	  			
		},		  		  		
	]);	  	 
	const title = ref("課表資訊");
	
	// table
	const tableTitle = ref([
		{field:"name", title:"課程名稱"},
		{field:"date", title:"課程日期"},	  		
		{field:"startHour", title:"課程時起"},
		{field:"startMin", title:"課程分起"},
		{field:"offHour", title:"課程時訖"},
		{field:"offMin", title:"課程分訖"},
	])

	const tableData = ref([
    { name: "Linux基礎到架站", date: "110/12/15", startHour: 9, startMin: 0, offHour: 12, offMin: 0},
    { name: "Linux基礎到架站", date: "110/12/15", startHour: 13, startMin: 30, offHour: 16, offMin: 30},
    { name: "Linux基礎到架站", date: "110/12/16", startHour: 13, startMin: 30, offHour: 16, offMin: 30},
    { name: "Linux基礎到架站", date: "110/12/16", startHour: 13, startMin: 30, offHour: 16, offMin: 30},
    { name: "Linux基礎到架站", date: "110/12/17", startHour: 13, startMin: 30, offHour: 16, offMin: 30},
    { name: "Linux基礎到架站", date: "110/12/17", startHour: 13, startMin: 30, offHour: 16, offMin: 30},
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
	.filter-box{
		height: auto;
		width: auto;
	  .selectInfo{
	  	width: 100px;
	  	height: 38px;
	  	background-color: #E9F2FF;
	  	border-radius: 4px;
	  	border: none;
	  	cursor: pointer;
	  };		
	  .btn-height{
	  	height: 38px;
	  }
	}
</style>
