<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="table-auto w-[95%] mx-auto text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-blue-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th v-if="heading != null" colspan="10" scope="col" class="text-base bg-white text-gray-700 px-6 py-5">
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
          class="h-20 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
          
          <td
            v-for="(col, key, colIndex) in eachData"
            :key='colIndex'
            class="text-center px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            
            <span 
              v-if="key==='expired' && col==true"
              class="bg-red-200 text-red-950 text-xs font-medium rounded">
              Expired
            </span>
            
            <span
              v-if="key==='expired' && col==false"
							class="bg-green-200 text-green-950 text-xs font-medium px-2.5 py-0.5 rounded">
              Active
            </span>

            <span 
              v-else-if="key !== 'logo' && key !== 'poster'">
              {{ col }}
            </span>
            
            <span
              v-else-if="(key === 'logo' || key === 'poster') && (!col || col === '')"
						  class="h-14 bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded capitalize"
						>
							Image Unavailable
            </span>

            <span 
              v-else-if="key === 'logo' || key === 'poster'" class="flex justify-center items-center">
              <img :src="col" alt="Logo" class="w-16 h-14 object-contain"/>
            </span>
            
          </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang='ts' setup>

  import { defineProps, defineEmits, PropType } from 'vue';

  const props = defineProps({
    heading: {
      type: String,
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
    emit('click', eachData);
  };

</script>

<style scoped>
/* Your styles here */
</style>
