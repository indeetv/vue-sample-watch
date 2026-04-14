<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="table-auto w-[95%] mx-auto text-sm text-center rtl:text-right text-gray-500">
      <thead class="text-xs text-blue-700 uppercase bg-gray-100">
        <tr>
          <th v-if="heading != null" colspan="10" scope="col" :class="['text-base', heading_align, 'bg-white', 'text-gray-700', 'px-6', 'py-8']">
            Selected {{ heading }}
          </th>
        </tr>
        <tr>
          <th v-for="(eachColumn, index) in columns" :key="index" scope="col" class="px-3 py-3">
            {{ eachColumn }}
          </th>
        </tr>
      </thead>

      <tbody>

        <tr v-if="!data.length && !isLoading">
          <td colspan="10" class="px-6 py-4 text-center">No data available</td>
        </tr>
        
        <tr
          v-for="(eachData, index) in data"
          :key="index"
          @click="triggerClick(eachData)"
          class="h-20 odd:bg-white even:bg-gray-50 border-b hover:bg-gray-200 cursor-pointer">
          
          <td
            v-for="(col, key, colIndex) in eachData"
            :key='colIndex'
            class="break-words  max-w-[8.25rem] text-center px-3 py-4 font-medium text-gray-900">
            
            <span 
              v-if="String(key) === 'expired' && col == true"
              class="bg-red-200 text-red-950 text-xs font-medium px-2.5 py-0.5 rounded">
              Expired
            </span>
            
            <span
              v-if="String(key) === 'expired' && col == false"
							class="bg-green-200 text-green-950 text-xs font-medium px-2.5 py-0.5 rounded">
              Active
            </span>

            <span 
              v-else-if="!['logo', 'poster', 'expired', 'header'].includes(String(key))">
              {{ col === '' ? 'Not Generated' : col }}
            </span>
            
            <span
              v-else-if="['logo', 'poster', 'header'].includes(String(key)) && (!col || col === '')"
              class="h-14 bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded capitalize"
						>
							{{key}} Unavailable
            </span>

            <span 
              v-else-if="['logo', 'poster', 'header'].includes(String(key))" 
              class="flex justify-center items-center">
              <img :src="col" alt="Logo" class="w-16 h-14 object-contain"/>
            </span>
            
          </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang='ts' setup>

  import { PropType } from 'vue';

  defineProps({
    heading: {
      type: String,
      required: false
    },
    heading_align: {
      type: String,
      default: "text-center",
      required: false
    },
    columns: {
      type: Array as PropType<string[]>,
      required: true
    },
    data: {
      type: Array as PropType<any[]>,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: true,
      required: true
    }
  });

  const emit = defineEmits();

  const triggerClick = (eachData: any) => {
    emit('clicked', eachData);
  };

</script>

<style scoped>
/* Your styles here */
</style>
