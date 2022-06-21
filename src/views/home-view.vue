<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import axios from 'axios'
import { date } from 'quasar'

const
	dateFilter = reactive<{ from : null | string, to : null | string }>( {
		from : null,
		to : null
	} ),

	tempWarning = ref( false ),
	humWarning = ref( false ),

	columns = [
		{
			name : 'id',
			label : '',
			sortable : true,
			align : 'left',

			field : 'id'
		},
		{
			name : 'temp',
			label : 't, ℃',
			sortable : true,

			field : 'temp'
		},
		{
			name : 'hum',
			label : 'h, %',
			sortable : true,

			field : 'hum'
		},
		{
			name : 'pres',
			label : 'p, mm',
			sortable : true,

			field : 'pres'
		},
		{
			name : 'date',
			label : 'Дата',
			sortable : true,

			field : 'date'
		}
	],

	table = ref<{ id : number, temp : number, hum : number, pres : number, date : string }[]>( [] ),
	cachedTable = ref<{ id : number, temp : number, hum : number, pres : number, date : string }[]>( [] )

onMounted( async () => {

	const { data } = await axios.get( 'http://78.140.241.46/api/data/2', {
		headers : {
			authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGaXJzdE5hbWUiOiJzdHJpbmciLCJMYXN0TmFtZSI6InN0cmluZyIsIk1pZGRsZU5hbWUiOiJzdHJpbmciLCJMb2dpbiI6InVzZXJAZXhhbXBsZS5jb20iLCJQYXNzd29yZEhhc2giOiI2cEZNNmpTUEVvSndpQnZiMzdEQUdjY1NxeVYyajJLODFGMGZxajVPSXB6TUxGbmNGQVhTNHpydFJwdFZub2l1SUs5UzIrdDY2M3JrVUFLTnpZVVBFZz09IiwiUGFzc3dvcmRTYWx0IjoiTzhHM2lIUkR3S3ZoQVIzU3BkVWc1dz09IiwiQ29tcGFueUlkIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMiIsIm5iZiI6MTY1NTgzNzAyNSwiZXhwIjoxNjU1OTIzNDI1LCJpc3MiOiJNeSBhcHBsaWNhdGlvbiIsImF1ZCI6Ik15IEF1ZGllbmNlIn0.eODiI54FdRKvr9kUNLVfeXbYesvii03vGqWhRASWK3s'
		}
	} )

	table.value = data.map( ( s : any, index : number ) => ( {
		id : index + 1,
		temp : s.temp,
		hum : s.humidity,
		pres : s.pressure,
		date : s.time
	} ) )

	cachedTable.value = table.value

} )

watch( dateFilter, () => {

	table.value = cachedTable.value

	if ( dateFilter.from ) {
		table.value = table.value.filter( s => date.isBetweenDates( new Date( s.date ), new Date( dateFilter.from as string ), new Date( s.date ), {
			onlyDate : true,
			inclusiveFrom : true,
			inclusiveTo : true
		} ) )
	}

	if ( dateFilter.to ) {
		table.value = table.value.filter( s => date.isBetweenDates( new Date( s.date ), new Date( s.date ), new Date( dateFilter.to as string ), {
			onlyDate : true,
			inclusiveFrom : true,
			inclusiveTo : true
		} ) )
	}

} )

</script>

<template>

  <div class="row q-my-md">
	<q-breadcrumbs class="col-8 offset-2" separator="-">
	  <q-breadcrumbs-el label="Компания" />
	  <q-breadcrumbs-el label="Роль" />
	  <q-breadcrumbs-el label="Пользователь" />
	</q-breadcrumbs>
  </div>

  <div class="row q-gutter-lg q-pb-lg">
	<div class="col-2 offset-2">

	  <div class="bg-grey-4 q-pa-md">

		<div class="text-body1 q-mb-xs">Фильтрация</div>

		<q-expansion-item
			dense
			label="Дата"
		>
		  <q-input v-model="dateFilter.from" label="От:" type="date" stack-label></q-input>
		  <q-input v-model="dateFilter.to" label="До:" type="date" stack-label></q-input>
		</q-expansion-item>

	  </div>

	  <br />

	  <div class="bg-grey-4 q-pa-md">

		<div class="text-body1 q-mb-xs">Предупреждения</div>

		<q-toggle v-model="tempWarning" label="Превышение t: 25C" />
		<q-toggle v-model="humWarning" label="Превышение h: 95%" />

	  </div>

	</div>
	<div class="col-6">

	  <div class="bg-grey-4 q-pa-md">
		<q-table
			:columns="columns"
			:rows="table"
			:pagination="{ rowsPerPage : 0 }"

			hide-pagination
		/>
	  </div>

	  <br />

	  <div class="bg-grey-4 q-pa-md">
		<q-img src="./../assets/graph.png"></q-img>
	  </div>

	</div>
  </div>

</template>
